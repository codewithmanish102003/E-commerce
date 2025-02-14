const express = require('express');
const router = express.Router()
const userModel=require("../models/user_model")
const isLoggedInUser = require('../middlewares/isLoggedInUser');
const { registerUser, loginUser, logout } = require("../controllers/authController")



router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/logout', logout)


module.exports = router;  //exporting the router to use in other files.