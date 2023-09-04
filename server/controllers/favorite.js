const { Favorite } = require('../models/Favorite');
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

            const result = await Favorite.find({ userID: value.userID });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the favorites" });
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

            const result = await Favorite.findOne({ userID: value.userID,productID:value.productID });
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
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const newFavorite = new Favorite(value);
            const result = await newFavorite.save();

            res.json({
                ...value,
                _id: result._id
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add favorite" });
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

            const deleted = await Favorite.findOne({ productID: value.productID,userID:value.userID });

            await Favorite.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error delete favorite" });
        }
    },
}