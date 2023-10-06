const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
});

exports.Admin = mongoose.model("admin", adminSchema);