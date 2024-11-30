const express = require("express");
const router = express.Router();
const {
  addWorkoutTemplate,
  getUserWorkoutTemplates,
  getUserWorkoutTemplate,
  deleteWorkoutTemplate,
  getWorkoutTemplateExercises,
  updateWorkoutTemplate,
} = require("../controllers/workoutTemplateController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, addWorkoutTemplate)
  .get(protect, getUserWorkoutTemplates);

router
  .route("/:id")
  .get(protect, getUserWorkoutTemplate)
  .put(protect, updateWorkoutTemplate)
  .delete(protect, deleteWorkoutTemplate);

router.route("/:id/exercises").get(protect, getWorkoutTemplateExercises);

module.exports = router;
