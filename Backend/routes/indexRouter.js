const express = require('express');
const isLoggedInUser = require('../middlewares/isLoggedInUser');
const productModel = require('../models/product_model');
const userModel = require('../models/user_model');
const ownerModel = require('../models/owners_model');
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the API", loggedin: false });
});


router.post('/addtocart/:id', isLoggedInUser, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.id);
        await user.save();
        res.json({ message: "Product added to cart" });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.get('/cart', isLoggedInUser, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        let total = user.cart.reduce((acc, product) => acc + product.price, 0) + 20 - user.cart.reduce((acc, product) => acc + product.discount, 0);
        res.json({ user, total, loggedin: true });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.get('/profile', isLoggedInUser, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        let total = user.cart.reduce((acc, product) => acc + product.price, 0) + 20 - user.cart.reduce((acc, product) => acc + product.discount, 0);
        res.json({ user, total, loggedin: true });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Owner Profile Route
router.get('/owner-profile', isLoggedInUser, async (req, res) => {
    try {
        const owner = await ownerModel.findOne({ email: req.user.email });
        if (!owner) {
            return res.status(404).json({ error: "Owner not found" });
        }
        const products = await productModel.find({ owner: owner._id });
        const usersWithProductsInCart = await userModel.find({ cart: { $in: products.map(p => p._id) } }).populate('cart');
        res.json({ owner, products, usersWithProductsInCart, loggedin: true });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;