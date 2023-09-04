const { User } = require('../models/User');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/dev');

module.exports = {
    login: async function (req, res, next) {

        const schema = joi.object({
            email: joi.string().required().min(6).max(256).email(),
            password: joi.string().required().min(6).max(1024),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(401).send('Unauthorized');
            return;
        }

        try {
            const user = await User.findOne({ email: value.email });
            if (!user) throw Error;
            const validPassword = await bcrypt.compare(value.password, user.password);
            if (!validPassword) throw 'Invalid password';

            const param = { email: value.email };
            const token = jwt.sign(param, config.jwt_token, { expiresIn: '72800s' });

            res.json({
                token: token,
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Invalid data.');
        }
    },

    signup: async function (req, res, next) {
        const schema = joi.object({
            firstName: joi.string().required().min(2).max(256),
            middleName: joi.string().allow(''),
            lastName: joi.string().required().min(2).max(256),
            phone: joi.string().required().min(10).max(13),
            email: joi.string().min(6).max(255).required().email(),
            password: joi.string().min(6).max(1024).required(),
            imageURL: joi.string().allow(''),
            imageALT: joi.string().allow(''),
            state: joi.string().allow(''),
            country: joi.string().min(2).max(1024).required(),
            city: joi.string().min(2).max(1024).required(),
            street: joi.string().min(2).max(1024).required(),
            houseNum: joi.string().min(1).max(1024).required(),
            zip: joi.string().allow(''),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).json({ error: 'error sign up new user' });
            return;
        }

        try {
            const user = await User.findOne({ email: value.email });
            if (user) {
                return res.status(400).json({ error: "User already registered." });
            }

            const hash = await bcrypt.hash(value.password, 10);

            const newUser = new User({
                firstName: value.firstName,
                middleName: value.middleName,
                lastName: value.lastName,
                phone: value.phone,
                email: value.email,
                password: hash,
                imageURL: value.imageURL,
                imageALT: value.imageALT,
                state: value.state,
                country: value.country,
                city: value.city,
                street: value.street,
                houseNum: value.houseNum,
                zip: value.zip
            });

            await newUser.save();

            res.json({
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: 'error sign up new user' });
        }
    },
}