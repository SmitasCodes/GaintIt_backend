const express = require("express");
const router = express.Router();
const {
  addWorkoutTemplate,
  getUserWorkoutTemplates,
  getSpecificUserWorkoutTemplate,
  deleteSpecificWorkoutTemplate,
  getWorkoutTemplateExercises,
} = require("../controllers/workoutTemplateController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, addWorkoutTemplate)
  .get(protect, getUserWorkoutTemplates);

router
  .route("/:id")
  .get(protect, getSpecificUserWorkoutTemplate)
  .delete(protect, deleteSpecificWorkoutTemplate);

router.route("/:id/exercises").get(protect, getWorkoutTemplateExercises);

module.exports = router;
