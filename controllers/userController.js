const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/usersModel");
const asyncHandler = require("express-async-handler");

//======================== REGISTER USER ========================//

// @desc Register new user
// @route POST /api/users
// @access PUBLIC

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    res.status(404);
    throw new Error("User with same email exist");
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("User with the same username exist");
  }

  const salt = await bcrypt.genSalt(10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
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
