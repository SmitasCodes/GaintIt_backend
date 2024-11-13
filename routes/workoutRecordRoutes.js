const express = require("express");
const router = express.Router();
const { addWorkoutRecord } = require("../controllers/workoutRecordController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addWorkoutRecord);

module.exports = router;
