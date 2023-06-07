const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  priceReal: {
    type: Number,
    require: true,
  },
  priceOld: {
    type: Number,
    require: true,
  },
  quantitySold: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    require: true,
  },
  description: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Category",
  },
  reviews: [reviewSchema],
},{ strict: false });


const Product = mongoose.model("Product",productSchema)


module.exports = Product;