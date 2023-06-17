const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantityOrder: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
  address: {
    type: String,
  },
},{
  timestamps:true,
});

module.exports = mongoose.model("Order", orderSchema);
