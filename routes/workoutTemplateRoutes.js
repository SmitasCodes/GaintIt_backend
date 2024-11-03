const express = require("express");
const router = express.Router();
const {
  addWorkoutTemplate,
  getUserWorkoutTemplates,
  getSpecificUserWorkoutTemplate,
} = require("../controllers/workoutTemplateController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, addWorkoutTemplate)
  .get(protect, getUserWorkoutTemplates);

router.route("/:id").get(protect, getSpecificUserWorkoutTemplate);

module.exports = router;
