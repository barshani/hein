const { Cart } = require('../models/Cart');
const joi = require('joi');

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const scheme = joi.object({
                userID: joi.string().required(),
            });

            const { error, value } = scheme.validate({userID: req.params.userID});

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const result = await Cart.find({ userID: value.userID });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the carts items" });
        }
    },
    getItem: async function (req, res, next) {
        try {
            const scheme = joi.object({
                userID: joi.string().required(),
                productID: joi.string().required(),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const result = await Cart.findOne({ userID: value.userID,productID:value.productID});
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the product" });
        }
    },
    add: async function (req, res, next) {
        try {
            const scheme = joi.object({
                userID: joi.string().required(),
                productID: joi.string().required(),
                quantity: joi.number().required(),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const newCart = new Cart(value);
            const result = await newCart.save();

            res.json({
                ...value,
                _id: result._id
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add carts item" });
        }
    },
    delete: async function (req, res, next) {
        try {
            const scheme = joi.object({
                userID: joi.string().required(),
                productID: joi.string().required(),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const deleted = await Cart.findOne({ productID: value.productID,userID:value.userID });

            await Cart.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error delete cart" });
        }
    },
    updateDetails: async function (req, res, next) {
        try {
            const schema = joi.object({
                userID: joi.string().required(),
                productID: joi.string().required(),
                quantity: joi.number().required(),

            });
            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error updating cart';
            }

            const filter = {
                _id: req.params.id
            };

            const product = await Cart.findOneAndUpdate(filter, value);
            if (!product) throw "No cart with this ID in the database";
            const updated = await Cart.findById(product._id);
            res.json(updated);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error updating details` });
        }
    },

}