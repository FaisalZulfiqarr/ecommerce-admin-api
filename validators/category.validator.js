const { body, param } = require("express-validator");

exports.createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
];

exports.updateCategoryValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
];
