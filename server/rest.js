var mongoose = require("mongoose");

var Menu = mongoose.Schema();

var MenuSchema = {
    name: String,
    price: String,
    ingredients: String,
    comments: [],
    vote: {
        type: Number,
        default: 0
    },
    imageurl: String
};

module.exports = mongoose.model("Menu", MenuSchema);