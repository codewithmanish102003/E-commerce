const express = require('express');
const router=express.Router()
const ownerModel=require("../models/owners_model")
const productModel = require("../models/product_model");
const isLoggedInUser=require("../middlewares/isLoggedInUser")
const userModel = require("../models/user_model");
const {registerAdmin}=require("../controllers/authController")

console.log(process.env.NODE_ENV);

router.post('/register',registerAdmin)


if (process.env.NODE_ENV==="development") {
    router.post("/create",async function(req,res){
       let owners=await ownerModel.find();
       if(owners.length>0){
        return res.status(504).send("You Don't have permission to create a new owner.")
       }else{
        let {fullname,email,password}=req.body
       let createdOwner=await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner)
       }
    })
}


router.get("/admin-register",(req,res)=>{
    let error=req.flash("error")
    res.render("admin-register",{error,loggedin:false})
})

// Updated Admin Route to Show Products Created by the Owner
router.get("/admin", isLoggedInUser , async (req, res) => {
    try {
        // Fetch the logged-in owner's details
        const owner = await ownerModel.findOne({ email: req.user.email });

        if (!owner) {
            req.flash("error", "Owner not found");
            return res.redirect("/owners/admin-register");
        }

        // Fetch all products created by the owner
        const products = await productModel.find({ owner: owner._id });

        // Render the admin page with the products
        res.render("admin", {
            products,
            success: req.flash("success"),
            error: req.flash("error"),
            loggedin: true,
        });
    } catch (err) {
        console.error("Error fetching admin data:", err);
        req.flash("error", "Something went wrong");
        res.redirect("/owners/admin-register");
    }
});

router.get("/all-products",isLoggedInUser,async (req,res)=>{
    try {
        // Fetch the logged-in owner's details
        const owner = await ownerModel.findOne({ email: req.user.email });

        if (!owner) {
            req.flash("error", "Owner not found");
            return res.redirect("/owners/admin-register");
        }

        // Fetch all products created by the owner
        const products = await productModel.find({ owner: owner._id });

        // Render the admin page with the products
        res.render("admin", {
            products,
            success: req.flash("success"),
            error: req.flash("error"),
            loggedin: true,
        });
    } catch (err) {
        console.error("Error fetching admin data:", err);
        req.flash("error", "Something went wrong");
        res.redirect("/owners/admin-register");
    }
})

router.get("/createproducts",(req,res)=>{
    res.render("createproducts")
})





module.exports=router