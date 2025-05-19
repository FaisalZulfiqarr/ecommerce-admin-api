const { Sale, Product, Category, Sequelize } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

exports.getSales = async (req, res) => {
  try {
    const { startDate, endDate, categoryId, productId } = req.query;

    const where = {};
    if (startDate && endDate)
      where.saleDate = { [Op.between]: [startDate, endDate] };
    if (productId) where.productId = productId;

    const include = [];
    if (categoryId) {
      include.push({
        model: Product,
        as: "product",
        include: [
          { model: Category, as: "category", where: { id: categoryId } },
        ],
      });
    } else {
      include.push({ model: Product, as: "product" });
    }

    const sales = await Sale.findAll({ where, include });
    res.json(sales);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createSale = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ error: "Sale not found" });

    // NOTE: No reverse inventory handling here — needs discussion
    await sale.update(req.body);
    res.json(sale);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getRevenue = async (req, res) => {
  try {
    const { groupBy = "monthly", categoryId } = req.query;

    const formatMap = {
      daily: "%Y-%m-%d",
      weekly: "%x-%v",
      monthly: "%Y-%m",
      yearly: "%Y",
    };

    const format = formatMap[groupBy] || "%Y-%m";

    const where = {};
    const include = [
      {
        model: Product,
        as: "product",
        include: categoryId
          ? [{ model: Category, as: "category", where: { id: categoryId } }]
          : [],
      },
    ];

    const revenue = await Sale.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("saleDate"), format), "period"],
        "productId",
        [fn("SUM", literal("quantity * totalPrice")), "totalRevenue"],
      ],
      include,
      group: ["period", "productId"],
      raw: false, // So associations like `product` get populated
    });

    res.json(revenue);
  } catch (err) {
    console.error("Revenue Error:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.compareRevenue = async (req, res) => {
  try {
    const { period1, period2, categoryId } = req.body;

    const makeQuery = async (start, end) => {
      const where = {
        saleDate: { [Op.between]: [start, end] },
      };

      if (categoryId) {
        // Get all products in this category
        const products = await Product.findAll({
          where: { categoryId },
          attributes: ["id"],
          raw: true,
        });

        const productIds = products.map((p) => p.id);

        where.productId = { [Op.in]: productIds };
      }

      const result = await Sale.findAll({
        where,
        attributes: [
          [
            Sequelize.fn("SUM", Sequelize.literal("quantity * totalPrice")),
            "totalRevenue",
          ],
        ],
        raw: true,
      });

      return parseFloat(result[0]?.totalRevenue || 0);
    };

    const [rev1, rev2] = await Promise.all([
      makeQuery(period1.start, period1.end),
      makeQuery(period2.start, period2.end),
    ]);

    res.json({ period1: rev1, period2: rev2 });
  } catch (err) {
    console.error("err", err);
    res.status(400).json({ error: err.message });
  }
};
