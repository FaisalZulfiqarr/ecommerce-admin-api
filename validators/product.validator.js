const { body, param } = require("express-validator");

exports.createProductValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").optional().isString(),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  body("categoryId").isInt().withMessage("Valid categoryId is required"),
];

exports.updateProductValidator = [
  param("id").isInt().withMessage("Product ID must be an integer"),
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("price").optional().isFloat({ gt: 0 }),
  body("categoryId").optional().isInt(),
];
