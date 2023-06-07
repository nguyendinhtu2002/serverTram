const mongoose = require("mongoose");

const categoriSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
})

const category = mongoose.model("Category", categoriSchema);

module.exports = category;
