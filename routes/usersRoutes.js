const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const User = require("../models/userModel");

router.post("/", registerUser(User));
router.post("/login", loginUser);

module.exports = router;
