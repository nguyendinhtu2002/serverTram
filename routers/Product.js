const express = require("express");
const {
  createProduct,
  getAll,
  updateProduct,
  deleteProduct,
  getDetails,
  addReview,
  getSlug,
  updateStatusReview,
} = require("../controllers/ProductController");
const { protect, admin } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/create", protect, admin, createProduct);
router.get("/", getAll);
router.put("/update/:id", protect, admin, updateProduct);
router.delete("/delete/:productId", deleteProduct);
router.get("/detail/:id", getDetails);
router.post("/addReview/:productId", protect, addReview);
router.get("/getProduct/:slug", getSlug);
router.put("/updateReview/:productId",updateStatusReview)
module.exports = router;
