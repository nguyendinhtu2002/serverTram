const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const Payment = require("../models/PaymentModel");

const Joi = require("joi");
const User = require("../models/UserModel");

const createOrder = async (req, res) => {
  const schema = Joi.object({
    customer: Joi.string().required(),
    products: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().required(),
          quantityOrder: Joi.number().min(1).required(),
        })
      )
      .required(),
    paymentMethod: Joi.string().required(),
    totalPrice: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { customer, products, totalPrice, paymentMethod } = value;

    const productIds = products.map((product) => product.product);
    const quantityOrders = products.map((product) => product.quantityOrder);

    const foundProducts = await Product.find({ _id: { $in: productIds } });

    // Kiểm tra và trừ số lượng sản phẩm
    const insufficientProducts = [];
    foundProducts.forEach((product, index) => {
      const requestedQuantity = quantityOrders[index];
      if (product.quantity < requestedQuantity) {
        insufficientProducts.push(product.name);
      }
    });

    if (insufficientProducts.length > 0) {
      return res.status(400).json({
        error: `Insufficient quantity for products: ${insufficientProducts.join(
          ", "
        )}`,
      });
    }

    foundProducts.forEach(async (product, index) => {
      const requestedQuantity = quantityOrders[index];
      const updatedQuantity = product.quantity - requestedQuantity;
      await Product.findOneAndUpdate(
        { _id: product._id },
        { quantity: updatedQuantity }
      );
    });

    const order = new Order({
      customer: customer,
      products: products,
      totalPrice: totalPrice,
    });

    const savedOrder = await order.save();
    if (savedOrder) {
      const payment = new Payment({
        orderId: savedOrder._id,
        amount: totalPrice,
        paymentMethod: paymentMethod,
      });

      await payment.save();
      res.status(201).json({ order: savedOrder });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    const ordersWithProductsAndCustomer = await Promise.all(
      orders.map(async (order) => {
        const customer = await User.findOne({ _id: order.customer });

        const productsWithDetails = order.products.map((item) => {
          const product = item.product;
          return {
            id: product._id,
            name: product.name,
            image: product.images,
            quantityOrder: item.quantityOrder,

          };
        });

        return {
          order: {
            ...order._doc,
            products: productsWithDetails,
            customerAddress: customer ? customer.address[0].address : "",
            phoneAddress: customer ? customer.address[0].phoneNumber : "",
          },
        };
      })
    );

    res.status(200).json(ordersWithProductsAndCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get orders" });
  }
};
const updateOrders = async (req, res) => {
  try {
    const { status } = req.body;

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

    const order = await Order.findById(orderId)
      .populate("customer")
      .populate("products");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: "Failed to get order details" });
  }
};
const deleteOrders = async (req, res) => {
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
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrders,
  getDetailsOrders,
  deleteOrders,
};
