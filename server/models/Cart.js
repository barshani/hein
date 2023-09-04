const { number } = require("joi");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    productID: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    }
});

exports.Cart = mongoose.model("cart", cartSchema);