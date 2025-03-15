const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners_model');
const upload = require('../config/multer_config');
const productModel = require('../models/product_model');
const isLoggedInUser = require('../middlewares/isLoggedInUser');

//1.fetching all products
router.get('/', async (req, res) => { 
    try {
        let products = await productModel.find({});
        products = products.map(product => {
            return {
                ...product._doc,
                image: product.image ? product.image.toString('base64') : null
            };
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

//2.create a product
router.post('/create', isLoggedInUser, upload.single('image'), async (req, res) => {
    console.log("create product");
    
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor, description } = req.body;
        const ownerId = req.user._id;
        const image = req.file ? req.file.buffer : null;

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const product = await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            description,
            owner: ownerId,
            image,
        });

        await ownerModel.findByIdAndUpdate(ownerId, {
            $push: { products: product._id }
        });

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: error.message });
    }
});

//3.deleting a created product

//4.updating a created product

module.exports = router;