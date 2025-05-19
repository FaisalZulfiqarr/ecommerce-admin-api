const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const {
  createCategoryValidator,
  updateCategoryValidator,
} = require("../validators/category.validator");
const validateRequest = require("../middlewares/validate");
router.post(
  "/",
  createCategoryValidator,
  validateRequest,
  categoryController.createCategory
);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put(
  "/:id",
  updateCategoryValidator,
  validateRequest,
  categoryController.updateCategory
);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
