const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  userId: String,
  from: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
