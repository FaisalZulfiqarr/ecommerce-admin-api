const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const {
  createCategoryValidator,
  updateCategoryValidator,
} = require("../validators/category.validator");
const { validationResult } = require("express-validator");

router.post(
  "/",
  createCategoryValidator,
  validationResult,
  categoryController.createCategory
);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put(
  "/:id",
  updateCategoryValidator,
  validationResult,
  categoryController.updateCategory
);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
