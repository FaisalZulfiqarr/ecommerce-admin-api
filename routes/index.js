const express = require("express");
const router = express.Router();

router.use("/categories", require("./category.routes"));
router.use("/products", require("./product.routes"));
router.use("/inventory", require("./inventory.routes"));
router.use("/sales", require("./sales.routes"));
router.use("/stats", require("./stats.routes"));

module.exports = router;
