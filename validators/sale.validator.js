const { body } = require("express-validator");

exports.createSaleValidator = [
  body("productId").isInt().withMessage("productId must be an integer"),
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  body("salePrice")
    .isFloat({ gt: 0 })
    .withMessage("Sale price must be greater than 0"),
  body("saleDate").isISO8601().withMessage("Invalid sale date format"),
];
