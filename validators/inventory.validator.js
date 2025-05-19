const { body, param } = require("express-validator");

exports.updateInventoryValidator = [
  param("productId").isInt().withMessage("productId must be an integer"),
  body("newStock").isInt().withMessage("newStock must be an integer"),
  body("reason").notEmpty().withMessage("reason is required"),
];
