const WorkoutTemplate = require("../models/workoutTemplateModel");
const asyncHandler = require("express-async-handler");

const addWorkoutTemplate = asyncHandler(async (req, res) => {
  const { name, exercises } = req.body;
  console.log("CAL:S")
  if (!name) {
    res.status(400);
    throw new Error("Please enter your workout template name!");
  }

  if (!exercises.length) {
    res.status(400);
    throw new Error("Please add some exercises!");
  }

  const workoutTemplate = await WorkoutTemplate.create({
    name,
    user_id: "672673a8fd96b6ca4e5bc75b",
    exercises,
  });

  if (workoutTemplate) {
    res.status(201).json({
      name: workoutTemplate.name,
      exercises: workoutTemplate.exercises,
    });
  } else {
    res.status(400);
    throw new Error("Invalid workout template data");
  }
});

module.exports = {
  addWorkoutTemplate,
};
