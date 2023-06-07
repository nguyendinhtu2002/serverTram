const Product = require("../models/ProductModel");
const Joi = require("joi");

const createProduct = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
    priceReal: Joi.number().required(),
    priceOld: Joi.number().required(),
    category: Joi.string().required(),
    categoryId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/),
    status: Joi.boolean(),
  }).pattern(/.*/, Joi.string());
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    // console.log(req.body)

    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAll = async(req,res)=>{
    try {
        const product = await Product.find({})
        return res.json(product)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = { createProduct,getAll };
