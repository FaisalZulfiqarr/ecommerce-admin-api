const { Sale, Product, Category } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

exports.getSales = async (req, res) => {
  const { startDate, endDate, categoryId, productId } = req.query;

  const where = {};
  if (startDate && endDate) where.date = { [Op.between]: [startDate, endDate] };
  if (productId) where.productId = productId;

  const include = [];
  if (categoryId) {
    include.push({
      model: Product,
      include: [{ model: Category, where: { id: categoryId } }],
    });
  } else {
    include.push({ model: Product });
  }

  const sales = await Sale.findAll({ where, include });
  res.json(sales);
};

exports.createSale = async (req, res) => {
  const { productId, quantity, price, date } = req.body;
  const sale = await Sale.create({ productId, quantity, price, date });

  const inventory = await require("../models").Inventory.findOne({
    where: { productId },
  });
  if (inventory) {
    inventory.quantity -= quantity;
    await inventory.save();
    await require("../models").InventoryLog.create({
      productId,
      change: -quantity,
      reason: "Sale",
    });
  }

  res.status(201).json(sale);
};

exports.updateSale = async (req, res) => {
  const sale = await Sale.findByPk(req.params.id);
  if (!sale) return res.status(404).json({ error: "Sale not found" });

  // NOTE: No reverse inventory handling here — needs discussion
  await sale.update(req.body);
  res.json(sale);
};

exports.getRevenue = async (req, res) => {
  const { groupBy = "monthly", categoryId } = req.query;

  const formatMap = {
    daily: "%Y-%m-%d",
    weekly: "%x-%v",
    monthly: "%Y-%m",
    yearly: "%Y",
  };

  const format = formatMap[groupBy] || "%Y-%m";

  const where = {};
  const include = [{ model: Product }];

  if (categoryId) {
    include[0].include = [{ model: Category, where: { id: categoryId } }];
  }

  const revenue = await Sale.findAll({
    attributes: [
      [fn("DATE_FORMAT", col("date"), format), "period"],
      [fn("SUM", literal("quantity * price")), "totalRevenue"],
    ],
    include,
    group: [literal(`period`)],
    raw: true,
  });

  res.json(revenue);
};

exports.compareRevenue = async (req, res) => {
  const { period1, period2, categoryId } = req.body;

  const makeQuery = (start, end) => {
    const where = { date: { [Op.between]: [start, end] } };
    const include = [{ model: Product }];
    if (categoryId) {
      include[0].include = [{ model: Category, where: { id: categoryId } }];
    }
    return Sale.sum(literal("quantity * price"), { where, include });
  };

  const [rev1, rev2] = await Promise.all([
    makeQuery(period1.start, period1.end),
    makeQuery(period2.start, period2.end),
  ]);

  res.json({ period1: rev1 || 0, period2: rev2 || 0 });
};
