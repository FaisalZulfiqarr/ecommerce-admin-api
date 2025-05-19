const { Sale, Inventory, Product, Sequelize } = require("../models");

exports.getOverviewStats = async (req, res) => {
  try {
    const totalSales = await Sale.sum("quantity");

    const revenueResult = await Sale.findAll({
      attributes: [
        [Sequelize.literal("SUM(quantity * totalPrice)"), "totalRevenue"],
      ],
      raw: true,
    });
    const totalRevenue = revenueResult[0].totalRevenue;

    const outOfStock = await Inventory.count({ where: { stock: 0 } });

    res.json({ totalSales, totalRevenue, outOfStock });
  } catch (err) {
    console.log("err", err);
    res.status(400).json(err);
  }
};
