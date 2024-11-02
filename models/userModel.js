const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Please add a username"],
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;
