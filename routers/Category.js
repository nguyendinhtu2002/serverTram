const express = require("express");
const { createCategories, getAll, filterUniqueNames } = require("../controllers/CategoriesController");
const router = express.Router();

router.post("/create", createCategories);
router.get("/",getAll)
router.get("/filter",filterUniqueNames)

module.exports = router;
