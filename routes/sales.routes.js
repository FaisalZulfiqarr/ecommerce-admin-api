const express = require("express");
const router = express.Router();
const salesController = require("../controllers/sales.controller");
const { createSaleValidator } = require("../validators/sale.validator");
const { validationResult } = require("express-validator");

router.get("/", salesController.getSales);
router.post(
  "/",
  createSaleValidator,
  validationResult,
  salesController.createSale
);
router.put("/:id", salesController.updateSale);

router.get("/revenue", salesController.getRevenue);
router.post("/revenue/compare", salesController.compareRevenue);

module.exports = router;
