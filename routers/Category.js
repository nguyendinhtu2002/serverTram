const express = require("express");
const { createCategories, getAll, filterUniqueNames, deleteCategories } = require("../controllers/CategoriesController");
const router = express.Router();
const { protect, admin } = require("../middleware/AuthMiddleware");

router.post("/create",protect,admin, createCategories);
router.get("/",getAll)
router.get("/filter",filterUniqueNames)
router.put("/delete/:id",protect,admin,deleteCategories)
module.exports = router;
