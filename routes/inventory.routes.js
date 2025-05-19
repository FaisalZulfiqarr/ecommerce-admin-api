const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory.controller");
const {
  updateInventoryValidator,
} = require("../validators/inventory.validator");
const validateRequest = require("../middlewares/validate");

router.get("/", inventoryController.getInventory);
router.get("/low-stock", inventoryController.getLowStock);
router.post("/", inventoryController.createInventory);
router.put(
  "/:productId",
  updateInventoryValidator,
  validateRequest,
  inventoryController.updateInventory
);
router.get("/logs/:productId", inventoryController.getInventoryLogs);

module.exports = router;
