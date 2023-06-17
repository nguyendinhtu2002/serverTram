const express = require("express");
const { createProduct, getAll, updateProduct, deleteProduct, getDetails } = require("../controllers/ProductController");
const { protect, admin } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/create",protect,admin,createProduct)
router.get("/",getAll)
router.put("/update/:id",protect,admin,updateProduct)
router.delete("/delete/:productId",protect,admin,deleteProduct)
router.get('/detail/:id',getDetails)
module.exports = router