const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");
const Demo = require("../models/demoModel");

router.post("/", registerUser(Demo));

module.exports = router;
