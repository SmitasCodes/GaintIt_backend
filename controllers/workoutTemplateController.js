const WorkoutTemplate = require("../models/workoutTemplateModel");
const asyncHandler = require("express-async-handler");

//======================== ADD WORKOUT TEMPLATE ========================//

// @desc Adds new workout template
// @route POST /api/workout-template/
// @access PRIVATE

const addWorkoutTemplate = asyncHandler(async (req, res) => {
  const { name, exercises } = req.body;
  const user_id = req.user._id;

  if (!name) {
    res.status(400);
    throw new Error("Please enter your workout template name!");
  }

  const nameExist = await WorkoutTemplate.findOne({ name, user_id });

  if (nameExist) {
    res.status(400);
    throw new Error("Workout template with same name exists!");
  }

  if (!exercises.length) {
    res.status(400);
    throw new Error("Please add some exercises!");
  }

  const workoutTemplate = await WorkoutTemplate.create({
    name,
    user_id: req.user._id,
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

//======================== GET USER WORKOUT TEMPLATES ========================//

// @desc Gets all of the user workout templates
// @route GET /api/workout-template/
// @access PRIVATE

const getUserWorkoutTemplates = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  const workoutTemplates = await WorkoutTemplate.find({ user_id });

  if (workoutTemplates && workoutTemplates.length > 0) {
    const workoutTemplatesRes = workoutTemplates.map((template) => ({
      name: template.name,
      exercises: template.exercises.map((exercise) => exercise.exercise_name),
    }));

    res.status(200).json({
      "workout-templates": workoutTemplatesRes,
    });
  } else {
    res.status(404);
    throw new Error("No workout template found");
  }
});

module.exports = {
  addWorkoutTemplate,
  getUserWorkoutTemplates,
};
