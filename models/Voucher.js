const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema({
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expiryDays: {
      type: Number,
      required: true,
    },
  });

module.exports = mongoose.model("Voucher", voucherSchema);
