// models/user_model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: Number,
        minLength:10,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        quantity:{
            type:Number,
            default: 1,
        }
    }],
});

module.exports = mongoose.model("user", userSchema);