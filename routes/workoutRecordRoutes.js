const express = require("express");
const router = express.Router();
const {
  addWorkoutRecord,
  getUserWorkoutRecords,
} = require("../controllers/workoutRecordController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, addWorkoutRecord)
  .get(protect, getUserWorkoutRecords);

module.exports = router;
