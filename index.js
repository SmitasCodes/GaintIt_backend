require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
// const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
