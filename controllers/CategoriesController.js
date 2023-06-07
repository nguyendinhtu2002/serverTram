const Category = require("../models/CategoriesModel");
const Joi = require("joi");

const createCategories = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  try {
    const validation = await schema.validateAsync(req.body);

    const category = new Category(validation);

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

module.exports = {
  createCategories,
  getAll,
};
