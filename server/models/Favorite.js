const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
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
});

exports.Favorite = mongoose.model("favorite", favoriteSchema);