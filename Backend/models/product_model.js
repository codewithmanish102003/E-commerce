// models/product_model.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "owner",
        required: true,
    },
    image: {
        type: Buffer, // Store image as a Buffer
    },
    bgcolor: {
        type: String,
        required: true,
    },
    panelcolor: {
        type: String,
        required: true,
    },
    textcolor: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("product", productSchema);