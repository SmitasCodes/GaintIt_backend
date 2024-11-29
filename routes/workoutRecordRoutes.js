const express = require("express");
const router = express.Router();
const {
  addWorkoutRecord,
  getUserWorkoutRecords,
  deleteWorkoutRecord,
} = require("../controllers/workoutRecordController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, addWorkoutRecord)
  .get(protect, getUserWorkoutRecords);
router.route("/:id").delete(protect, deleteWorkoutRecord);

module.exports = router;
