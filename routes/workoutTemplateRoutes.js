const express = require("express");
const router = express.Router();
const {
  addWorkoutTemplate,
} = require("../controllers/workoutTemplateController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addWorkoutTemplate);

module.exports = router;
