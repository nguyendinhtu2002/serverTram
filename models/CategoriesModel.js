const mongoose = require("mongoose");

const categoriSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    type:{
        type:String,
    },
    image:{
        type:String,
    }
},{
    timestamps:true,
  })

const category = mongoose.model("Category", categoriSchema);

module.exports = category;
