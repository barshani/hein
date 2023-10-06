const joi = require('joi');
const {Admin} = require('../models/Admin')

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await Admin.find({});
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting admins' });
        }
    },

    getOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                userID: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw `error get details`;
            }

            const admin = await Admin.findOne({ userID: value.userID});
            if (!admin) throw "Invalid user id, no such user.";
            res.json(admin);
        }
        catch (err) {
            res.status(400).json({ error: "Invalid data" });
            console.log(`Error: ${err}`);
        }
    },

    addNew: async function (req, res, next) {
        try {
            const schema = joi.object({
                userID: joi.string().min(2).max(256).required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                throw 'error add admin';
            }

            const admin = new Admin(value);
            const newAdmin = await admin.save();
            res.json(newAdmin);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error adding admin` });
        }
    },
    deleteOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                userID: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw `error delete user`;
            }

            const deleted = await Admin.findOneAndRemove({
                userID: value.userID
            });

            if (!deleted) throw "failed to delete";
            res.json(deleted);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error delete admin` });
        }
    },
}