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
    typeCharm: Joi.array().items(Joi.string()),
    count: Joi.string(),
    size: Joi.array().items(Joi.number()),
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
    const products = await Product.find({})
    .populate('categoryId', 'type')
    .select('-categoryId');
        return res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const data = req.body;
    if (data.quantity == 0) {
      data.status = false;
    }
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!updateProduct) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ product: updateProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};
const deleteProduct = async (req, res) => {
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
};
const getDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDetails = await Product.findById(productId);
    if (productDetails) {
      return res.json(productDetails);
    } else {
      return res.status(400).json({ message: "Khong tim thay san pham!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const addReview = async (req, res) => {
  const { username, rating, comment, images } = req.body;

  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newReview = {
      username,
      rating,
      comment,
      images,
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add review" });
  }
};
const getSlug = async (req, res) => {
  try {
    const checkProduct = await Product.find({ slug: req.params.slug });
    if (checkProduct) {
      return res.json(checkProduct);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Co loi gi do" });
  }
};
const updateStatusReview = async (req, res) => {
  const { reviewId, status } = req.body;

  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const review = product.reviews.find(
      (review) => review._id.toString() === reviewId
    );

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.status = status;
    await product.save();

    res.status(200).json({ message: "Review status updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update review status" });
  }
};

module.exports = {
  createProduct,
  getAll,
  updateProduct,
  deleteProduct,
  getDetails,
  addReview,
  getSlug,
  updateStatusReview
};
