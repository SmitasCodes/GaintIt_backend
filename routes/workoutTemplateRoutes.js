const express = require("express");
const router = express.Router();
const {
  addWorkoutTemplate,
} = require("../controllers/workoutTemplateController");

router.post("/", addWorkoutTemplate);

module.exports = router;
