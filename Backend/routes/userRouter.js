const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout, deleteUser ,deactivateUser} = require("../controllers/authController");
const isLoggedInUser = require('../middlewares/isLoggedInUser');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);
router.delete('/delete', deleteUser);
router.post('/deactivate', deactivateUser);
router.get('/me', isLoggedInUser, (req, res) => {
    res.json(req.user);
});

module.exports = router;