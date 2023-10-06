const { number } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    color: {
        type: String,
        minlength: 2,
        maxlength: 1024,
    },
    size: {
        type: String,
        minlength: 2,
        maxlength: 1024,
    },
    description: {
        type: String,
        minlength: 2,
        maxlength: 1024,
    },
    imageURL: {
            type: String,
            minlength: 2,
            maxlength: 1024,
        },
     imageALT: { type: String, minlength: 2, maxlength: 256 
    },
    price:{
        type:Number,
        required:true,
    },
    category: {
        type: String,
        minlength: 3,
        required: true,
    },
});

exports.Product = mongoose.model("product", productSchema);