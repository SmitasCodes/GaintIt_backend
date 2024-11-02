require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
// const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/workoutTemplate", require("./routes/workoutTemplateRoutes"));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
