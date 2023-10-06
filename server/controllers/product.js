const joi = require('joi');
const {Product} = require('../models/Product')

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await Product.find({});
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting projects' });
        }
    },

    getOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw `error get details`;
            }

            const product = await Product.findById(value.id);
            if (!product) throw "Invalid project id, no such project.";
            res.json(product);
        }
        catch (err) {
            res.status(400).json({ error: "Invalid data" });
            console.log(`Error: ${err}`);
        }
    },

    addNew: async function (req, res, next) {
        try {
            const schema = joi.object({
                name: joi.string().min(2).max(256).required(),
                color: joi.string().min(2).max(1024).allow(''),
                size: joi.string().min(2).max(1024).allow(''),
                imageURL: joi.string().allow(''),
                imageALT: joi.string().allow(''),
                price: joi.string().required(),
                category: joi.string().min(3).required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                throw 'error add project';
            }

            const product = new Product(value);
            console.log(product)
            const newProduct = await product.save();
            res.json(newProduct);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error adding project` });
        }
    },

    updateDetails: async function (req, res, next) {
        try {
            const schema = joi.object({
                 _id: joi.required(),
                name: joi.string().min(2).max(256).required(),
                color: joi.string().min(2).max(1024).allow(''),
                size: joi.string().min(2).max(1024).allow(''),
                imageURL: joi.string().allow(''),
                imageALT: joi.string().allow(''),
                price: joi.number().required(),
                category: joi.string().min(3).required(),
            });
            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error updating project';
            }

            const filter = {
                _id: req.params.id
            };

            const product = await Product.findOneAndUpdate(filter, value);
            if (!product) throw "No project with this ID in the database";
            const updated = await Product.findById(product._id);
            res.json(updated);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error updating details` });
        }
    },

    deleteOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw `error delete project`;
            }

            const deleted = await Product.findOneAndRemove({
                _id: value.id
            });

            if (!deleted) throw "failed to delete";
            res.json(deleted);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error delete project` });
        }
    },
}