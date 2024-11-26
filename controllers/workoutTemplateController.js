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
      _id: workoutTemplate._id,
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
    res.status(200).json({
      templates: workoutTemplates,
    });
  } else {
    res.status(404);
    throw new Error("No workout template found");
  }
});

//======================== UPDATE WORKOUT TEMPLATE ========================//

// @desc Update workout template by template id
// @route PUT /api/workout-template/:id
// @access PRIVATE

const updateWorkoutTemplate = asyncHandler(async (req, res) => {
  const template_id = req.params.id;
  const user_id = req.user._id;

  console.log(req.body)

  if (!template_id) {
    res.status(400);
    throw new Error("Template ID is required");
  }

  try {
    const result = await WorkoutTemplate.findOneAndUpdate (
      { _id: template_id, user_id },
      req.body
    );

    if (!result) {
      res
        .status(404)
        .json({ message: "Template not found or no changes made" });
    } else {
      res.status(200).json({ message: "Template updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//======================== GET WORKOUT TEMPLATE ========================//

// @desc Gets specific user workout template by id
// @route GET /api/workout-template/:id
// @access PRIVATE

const getSpecificUserWorkoutTemplate = asyncHandler(async (req, res) => {
  const template_id = req.params.id;
  const user_id = req.user._id;

  const workoutTemplate = await WorkoutTemplate.findOne({
    _id: template_id,
    user_id,
  });

  if (workoutTemplate) {
    const workoutTemplateRes = {
      name: workoutTemplate.name,
      exercises: workoutTemplate.exercises.map(
        (exercise) => exercise.exercise_name
      ),
    };

    res.status(200).json({
      "workout-template": workoutTemplateRes,
    });
  } else {
    res.status(404);
    throw new Error("No specific workout template found");
  }
});

//======================== DELETE WORKOUT TEMPLATE ========================//

// @desc Delete specific user workout template by id
// @route GET /api/workout-template/:id
// @access PRIVATE

const deleteSpecificWorkoutTemplate = asyncHandler(async (req, res) => {
  const template_id = req.params.id;
  const user_id = req.user._id;

  try {
    const deleteTemplate = await WorkoutTemplate.deleteOne({
      user_id,
      _id: template_id,
    });

    if (deleteTemplate.deletedCount === 0) {
      res.status(404);
      throw new Error("Workout template not found");
    }

    res.status(200).json({ message: "Workout template deleted" });
  } catch {
    res.status(400);
    throw new Error({ message: error.message });
  }
});

//======================== GET TEMPLATE EXERCISES ========================//

// @desc Get template exercises
// @route GET /api/workout-template/:id/exercises/
// @access PRIVATE

const getWorkoutTemplateExercises = asyncHandler(async (req, res) => {
  const template_id = req.params.id;
  const user_id = req.user._id;

  const workoutTemplate = await WorkoutTemplate.findOne({
    _id: template_id,
    user_id,
  });

  if (workoutTemplate) {
    res.status(200).json({ exercises: workoutTemplate.exercises });
  } else {
    res.status(404);
    throw new Error("No template exercises found");
  }
});

module.exports = {
  addWorkoutTemplate,
  getUserWorkoutTemplates,
  updateWorkoutTemplate,
  getSpecificUserWorkoutTemplate,
  deleteSpecificWorkoutTemplate,
  getWorkoutTemplateExercises,
};
