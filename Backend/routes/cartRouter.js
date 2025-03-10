const express = require('express');
const isLoggedInUser = require('../middlewares/isLoggedInUser');
const userModel = require('../models/user_model');
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API", loggedin: false });
});

router.post('/addtocart/:id', isLoggedInUser, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });

    if (user.cart.includes(req.params.id)) {
      req.flash('error', "Product is already added")
      res.json({ error: "Product is already added", flash: req.flash() });
    } else {
      user.cart.push(req.params.id);
      await user.save();
      req.flash('success', "Successfully added to cart");
      res.status(201).json({ message: "Product added to cart", flash: req.flash() });
    }
  } catch (err) {
    req.flash('error', "Error while adding to cart");
    res.status(400).json({ error: "Something went wrong", flash: req.flash() });
  }
});

router.put('/updatequantity/:id', isLoggedInUser, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    const productIndex = user.cart.findIndex(product => product.toString() === req.params.id);
    if (productIndex !== -1) {
      if (req.query.operation === 'decrease') {
        user.cart[productIndex].quantity -= 1;
      } else if (req.query.operation === 'increase') {
        user.cart[productIndex].quantity += 1;
      }
      await user.save();
      res.status(200).json({ message: "Quantity updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to update quantity" });
  }
});

router.delete('/removefromcart/:id', isLoggedInUser, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart = user.cart.filter(product => product.toString() !== req.params.id);
    await user.save();
    req.flash('success', "Successfully removed from cart");
    res.status(200).json({ message: "Product removed from cart", flash: req.flash() });
  } catch (err) {
    req.flash('error', "Error while removing from cart");
    res.status(400).json({ error: "Something went wrong", flash: req.flash() });
  }
});

router.get('/cartproducts', isLoggedInUser, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart").exec();
    user = user.cart.map(product => {
      return {
        ...product._doc,
        image: product.image ? product.image.toString('base64') : null
      };
    });
    res.json({ user, total: user.reduce((acc, product) => acc + product.price, 0), loggedin: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router