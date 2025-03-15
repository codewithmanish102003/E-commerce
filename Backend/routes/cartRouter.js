const express = require('express');
const isLoggedInUser = require('../middlewares/isLoggedInUser');
const userModel = require('../models/user_model');
const router = express.Router();

//1.Add ti cart
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

//2.update Quantity
router.put('/updatequantity/:id', isLoggedInUser, async (req, res) => {
  try {
    const productId = req.params.id;
    const operation = req.query.operation;
    const user = await userModel.findOne({ email: req.user.email }).populate("cart").exec();

    const cartIndex = user.cart.findIndex((cartItem) => cartItem.product._id.toString() === productId);

if (cartIndex === -1) {
  return res.status(404).json({ error: "Product not found in cart" });
}

const update = {};
if (operation === 'decrease') {
  update.$inc = { "cart.$.quantity": -1 };
} else if (operation === 'increase') {
  update.$inc = { "cart.$.quantity": 1 };
}

await userModel.updateOne({ email: req.user.email, "cart.product": productId }, update);

// Update cart total
const cartTotal = user.cart.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0);

res.status(200).json({ message: "Quantity updated successfully", cartTotal });
  } catch (err) {
    res.status(400).json({ error: "Failed to update quantity" });
  }
});

//3.Delete from Cart
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

//4.Fetching all Products from cart
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