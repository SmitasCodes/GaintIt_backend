const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//======================== REGISTER USER ========================//

// @desc Register new user
// @route POST /api/users/
// @access PUBLIC

const registerUser = (Model) =>
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Missing required fields");
    }

    const emailExist = await Model.findOne({ email });
    if (emailExist) {
      res.status(400);
      throw new Error("User with the same email exist");
    }

    const usernameExists = await Model.findOne({ username });
    if (usernameExists) {
      res.status(400);
      throw new Error("User with the same username exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Model.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!user) {
      res.status(400);
      throw new Error("Invalid user data");
    }

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  });

//======================== LOGIN USER ========================//

// @desc Login a user
// @route POST /api/users/login
// @access PUBLIC

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user && !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  
  res.status(200).json({
    _id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
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
