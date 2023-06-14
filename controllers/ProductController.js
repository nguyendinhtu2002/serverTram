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
    quantity: Joi.number().required(),
    categoryId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/),
    status: Joi.boolean(),
    typeCharm:Joi.array().items(Joi.string()),
    count:Joi.array().items(Joi.string()),
    size:Joi.array().items(Joi.number()),
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
const getAll = async (req, res) => {
  try {
    const product = await Product.find({})
    return res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const updateProduct = async (req, res) => {
  try {
    const data = req.body;

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ product: updateProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
}
const deleteProduct = async(req,res)=>{
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
}
const getById = async(req,res)=>{
  try {
    const product = await Product.findOne({_id:req.params.id})
    if(product){
      return res.json(product)
    }
    else{
      return res.status(400).json({message:"Khong tim thay cai gi!"})
    }
  } catch (error) {
    return res.status(400).json({message:"Co loi"})
  }
}
module.exports = { createProduct, getAll,updateProduct,deleteProduct,getById };
