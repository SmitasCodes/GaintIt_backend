const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to DB ${connect.connection.host}`);
  } catch (err) {
    console.error(`Could not connect to DB ${err}`);
  }
};

module.exports = connectDB;