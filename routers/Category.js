const express = require("express");
const { createCategories, getAll } = require("../controllers/CategoriesController");
const router = express.Router();

router.post("/create", createCategories);
router.get("/",getAll)
module.exports = router;
