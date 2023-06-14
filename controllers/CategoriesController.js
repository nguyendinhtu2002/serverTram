const Category = require("../models/CategoriesModel");
const Joi = require("joi");

const createCategories = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  }).pattern(/.*/, Joi.string());
  try {
    const validation = await schema.validateAsync(req.body);

    const category = new Category(req.body);

    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAll = async (req, res, next) => {
  try {
    const data = await Category.find({});
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const filterUniqueNames = async (req, res) => {
  try {
    const products = await Category.find();

    // Sử dụng Set để lọc tên sản phẩm duy nhất
    const uniqueNamesSet = new Set(products.map((product) => product.name));

    // Chuyển Set thành mảng
    const uniqueNames = Array.from(uniqueNamesSet);

    res.status(200).json({ uniqueNames });
  } catch (error) {
    res.status(500).json({ error: "Failed to filter unique names" });
  }
};
module.exports = {
  createCategories,
  getAll,
  filterUniqueNames,
};
