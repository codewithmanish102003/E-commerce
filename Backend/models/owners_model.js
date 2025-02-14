const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    role:{
        type:String,
        default:"owner"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    image: {
        type: Buffer, // Store image as a Buffer
    },
    contact:{
        type:Number,
        minLength:10,
        trim:true
    },
    gstno: String,
});

module.exports = mongoose.model("owner", ownerSchema);