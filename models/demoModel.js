const mongoose = require("mongoose");
const userSchema = require("./userModel").schema;

const Demo = mongoose.model("Demo", userSchema);

module.exports = Demo;
