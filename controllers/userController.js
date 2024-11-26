const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Demo = require("../models/demoModel");
const asyncHandler = require("express-async-handler");

//======================== REGISTER USER ========================//

// @desc Register new user
// @route POST /api/users/
// @access PUBLIC

const registerUser = (modelType) =>
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    let Model;
    switch (modelType) {
      case "User":
        Model = User;
        break;
      case "Demo":
        Model = Demo;
        break;
      default:
        return res.status(400).json({ message: "Invalid model type" });
    }

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please enter all fields");
    }

    const emailExist = await modelType.findOne({ email });
    if (emailExist) {
      res.status(400);
      throw new Error("User with same email exist");
    }

    const usernameExists = await modelType.findOne({ username });
    if (usernameExists) {
      res.status(400);
      throw new Error("User with same username exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await modelType.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
        role: user.role,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

//======================== LOGIN USER ========================//

// @desc Login a user
// @route POST /api/users/login
// @access PUBLIC

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
