const userModel = require('../models/user_model');
const ownerModel = require('../models/owners_model');
const productModel = require('../models/product_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    console.log("register")
    try {
        let { email, fullname, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            req.flash('error_msg', 'Email Is Already Registered');
            return res.status(400).json({ error: 'Email Is Already Registered', flash: req.flash() });
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ error: err.message });
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).json({ error: err.message });
                let user = await userModel.create({
                    email,
                    password: hash,
                    fullname
                });

                let token = generateToken(user);
                res.cookie("token", token);
                req.flash('success_msg', 'User registered successfully');
                res.status(201).json({ message: 'User registered successfully', token, flash: req.flash() });
            });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.registerAdmin = async (req, res) => {
    try {
        let { email, fullname, password, image, gstno, contact } = req.body;

        let owner = await ownerModel.findOne({ email });
        if (owner) {
            req.flash('error_msg', 'Owner already exists');
            return res.status(400).json({ error: 'Owner already exists', flash: req.flash() });
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ error: err.message });
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).json({ error: err.message });
                let owner = await ownerModel.create({
                    email,
                    password: hash,
                    fullname,
                    image,
                    gstno,
                    contact
                });

                let token = generateToken(owner);
                res.cookie("token", token);
                req.flash('success_msg', 'Owner registered successfully');
                res.status(201).json({ message: 'Owner registered successfully', token, flash: req.flash() });
            });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    console.log("route login")
    let user = await userModel.findOne({ email });
    if (!user) {
        let owner = await ownerModel.findOne({ email });
        if (owner) {
            bcrypt.compare(password, owner.password, async (err, result) => {
                console.log(result);
                
                if (result) {
                    let role = owner.role;
                    let token = generateToken(owner);
                    res.cookie("token", token, { httpOnly: true, sameSite: 'None', secure: true });
                    const products = await productModel.find({ owner: owner._id });
                    
                    req.flash('success_msg', 'Login successful');
                    return res.status(200).json({ message: 'Login successful', owner, token, products, role, flash: req.flash() });
                } else {
                    req.flash('error_msg', 'Invalid credentials');
                    return res.status(401).json({ error: 'Invalid credentials', flash: req.flash() });
                }
            });
        } else {
            req.flash('error_msg', 'Email or password is incorrect');
            return res.status(404).json({ error: 'Email or password is incorrect', flash: req.flash() });
        }
    } else {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token, { httpOnly: true, sameSite: 'None', secure: true });
                req.flash('success_msg', 'Login successful');
                return res.status(200).json({ message: 'Login successful', user,token, flash: req.flash() });
            } else {
                req.flash('error_msg', 'Invalid credentials');
                return res.status(401).json({ error: 'Invalid credentials', flash: req.flash() });
            }
        });
    }
};

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    req.flash('success_msg', 'Logged out successfully');
    res.status(200).json({ message: 'Logged out successfully', flash: req.flash() });
};