const router = require("express").Router();
const {
  addProduct,
  getProductsByCategory,
} = require("../controllers/productController");

router.post("/", addProduct);
router.get("/:categoryId", getProductsByCategory);

module.exports = router;
