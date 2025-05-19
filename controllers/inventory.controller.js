const { Inventory, InventoryLog, Product } = require("../models");
const { Op } = require("sequelize");

exports.getInventory = async (req, res) => {
  const inventory = await Inventory.findAll({ include: Product });
  res.json(inventory);
};

exports.getLowStock = async (req, res) => {
  const inventory = await Inventory.findAll({
    where: { quantity: { [Op.lt]: 10 } },
    include: Product,
  });
  res.json(inventory);
};

exports.createInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const inv = await Inventory.create({ productId, quantity });
    await InventoryLog.create({
      productId,
      change: quantity,
      reason: "Initial stock",
    });
    res.status(201).json(inv);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  const { newStock, reason } = req.body;
  const { productId } = req.params;

  const inventory = await Inventory.findOne({ where: { productId } });
  if (!inventory) return res.status(404).json({ error: "Inventory not found" });

  const change = newStock - inventory.quantity;
  inventory.quantity = newStock;
  await inventory.save();

  await InventoryLog.create({ productId, change, reason });

  res.json(inventory);
};

exports.getInventoryLogs = async (req, res) => {
  const logs = await InventoryLog.findAll({
    where: { productId: req.params.productId },
    order: [["createdAt", "DESC"]],
  });
  res.json(logs);
};
