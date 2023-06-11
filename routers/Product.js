const express = require("express");
const { createProduct, getAll } = require("../controllers/ProductController");
const { protect } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/create",createProduct)
router.get("/",getAll)


module.exports = router