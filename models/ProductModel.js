const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    quantityReal: {
      type: Number,
      require: true,
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
    rate: {
      type: Number,
      default: 0,
    },
    description: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Category",
    },
    reviews: [reviewSchema],
  },
  { strict: false },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
