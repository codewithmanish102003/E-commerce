const express = require('express');
const isLoggedInUser = require('../middlewares/isLoggedInUser');
const userModel = require('../models/user_model');
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the API", loggedin: false });
});

router.post('/addtocart/:id', isLoggedInUser, async (req, res) => {
    console.log("route hitted")
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.id);
        await user.save();
        req.flash('success',"Successfully added to cart");
        res.status(201).json({ message: "Product added to cart" ,flash: req.flash() });
    } catch (err) {
        req.flash('error',"Error while adding to cart");
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