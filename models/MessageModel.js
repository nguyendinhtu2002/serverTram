const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  userId: String,
  from: String,
  message: String,
},{
  timestamps:true,
});
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
