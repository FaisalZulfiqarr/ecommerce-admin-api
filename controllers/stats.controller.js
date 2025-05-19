const { Sale, Inventory, Product } = require("../models");
const { fn, col, literal } = require("sequelize");

exports.getOverviewStats = async (req, res) => {
  const totalSales = await Sale.sum("quantity");
  const totalRevenue = await Sale.sum(literal("quantity * price"));
  const outOfStock = await Inventory.count({ where: { quantity: 0 } });

  res.json({ totalSales, totalRevenue, outOfStock });
};
