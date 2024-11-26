const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const Demo = require("../../models/demoModel");
const NOT_AUTHORIZED = "Not authorized";
const NOT_AUTHORIZED_NO_TOKEN = "Not authorized, no token";

async function getUser(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return { status: 401, response: NOT_AUTHORIZED_NO_TOKEN };
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = await User.findById(decoded.id).select("-password");

      if (!user) {
        user = await Demo.findById(decoded.id).select("-password");
        if (!user) {
          return { status: 404, response: "User not found in both collections" };
        }
      }

      return { status: 200, response: user };
    } catch (error) {
      console.log(error);
      return { status: 401, response: NOT_AUTHORIZED };
    }
  }
  return { status: 401, response: NOT_AUTHORIZED };
}

module.exports = { getUser, notAuthorizedMessage: NOT_AUTHORIZED };
