const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

const Joi = require("joi");

const createOrder = async (req, res) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    productIds: Joi.array().items(Joi.string()).required(),
    totalPrice: Joi.number().required(),
    quantityOrder: Joi.array().items(Joi.number().min(1)).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { customerId, productIds, totalPrice, quantityOrder } = value;

    const products = await Product.find({ _id: { $in: productIds } });

    // Kiểm tra và trừ số lượng sản phẩm
    const insufficientProducts = [];
    products.forEach((product) => {
      const requestedIndex = productIds.findIndex((id) => id === product._id.toString());
      const requestedQuantity = quantityOrder[requestedIndex];
      if (product.quantity < requestedQuantity) {
        insufficientProducts.push(product.name);
      }
    });

    if (insufficientProducts.length > 0) {
      return res.status(400).json({ error: `Insufficient quantity for products: ${insufficientProducts.join(", ")}` });
    }

    products.forEach(async (product) => {
      const requestedIndex = productIds.findIndex((id) => id === product._id.toString());
      const requestedQuantity = quantityOrder[requestedIndex];
      const updatedQuantity = product.quantity - requestedQuantity;
      await Product.findOneAndUpdate({ _id: product._id }, { quantity: updatedQuantity });
    });

    const order = new Order({
      customer: customerId,
      products: productIds,
      totalPrice: totalPrice,
    });

    const savedOrder = await order.save();

    res.status(201).json({ order: savedOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products");

    const ordersWithProducts = orders.map((order) => {
      return {
        order,
      };
    });

    res.status(200).json({ orders: ordersWithProducts });
  } catch (error) {
    res.status(500).json({ error: "Failed to get orders" });
  }
};
const updateOrders = async (req, res) => {
  try {
    const {status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};
const getDetailsOrders = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId).populate("customer").populate("products");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: "Failed to get order details" });
  }
};
const deleteOrders = async(req,res)=>{
  try {
    const orderId = req.params.orderId;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: "order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
}
module.exports = { createOrder,getAllOrders,updateOrders,getDetailsOrders,deleteOrders };
