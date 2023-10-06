const { boolean } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
       firstName: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    
    phone: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 13,
    },
    email: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 256,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    imageURL: {
        type: String,
    },
    imageALT: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    street: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    houseNum: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024,
    },
    zip: {
        type: String,
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

exports.User = User;