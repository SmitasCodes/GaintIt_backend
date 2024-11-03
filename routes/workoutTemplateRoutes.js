const express = require("express");
const router = express.Router();
const {
  addWorkoutTemplate,
  getUserWorkoutTemplates,
} = require("../controllers/workoutTemplateController");
const { protect } = require("../middleware/authMiddleware");

// Route for creating a workout template
router.route("/")
    .post(protect, addWorkoutTemplate)
    .get(protect, getUserWorkoutTemplates);

module.exports = router;
