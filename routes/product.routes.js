const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const {
  createProductValidator,
  updateProductValidator,
} = require("../validators/product.validator");
const validateRequest = require("../middlewares/validate");

router.post(
  "/",
  createProductValidator,
  validateRequest,
  productController.createProduct
);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  updateProductValidator,
  validateRequest,
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
