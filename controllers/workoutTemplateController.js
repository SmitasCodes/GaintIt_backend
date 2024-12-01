const WorkoutTemplate = require("../models/workoutTemplateModel");
const asyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");

//======================== ADD WORKOUT TEMPLATE ========================//

// @desc Adds new workout template
// @route POST /api/workout-template/
// @access PRIVATE

const addWorkoutTemplate = asyncHandler(async (req, res) => {
  const { name, exercises } = req.body;
  const user_id = req.user._id;

  if (!ObjectId.isValid(user_id)) {
    res.status(400);
    throw new Error("User ID is not valid.");
  }

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

  try {
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
  } catch (error) {
    res.status(500);
    console.log(error.message);
  }
});

//======================== GET USER WORKOUT TEMPLATES ========================//

// @desc Gets all of the user workout templates
// @route GET /api/workout-template/
// @access PRIVATE

const getUserWorkoutTemplates = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  if (!ObjectId.isValid(user_id)) {
    res.status(400);
    throw new Error("User ID is not valid.");
  }

  try {
    const workoutTemplates = await WorkoutTemplate.find({ user_id });

    if (workoutTemplates && workoutTemplates.length > 0) {
      res.status(200).json({
        templates: workoutTemplates,
      });
    } else {
      res.status(404);
      throw new Error("No workout template found");
    }
  } catch (error) {
    res.status(500);
    console.error(error.message);
  }
});

//======================== UPDATE WORKOUT TEMPLATE ========================//

// @desc Update workout template by template id
// @route PUT /api/workout-template/:id
// @access PRIVATE

const updateWorkoutTemplate = asyncHandler(async (req, res) => {
  const template_id = req.params.id;
  const user_id = req.user._id;

  if (!ObjectId.isValid(template_id) || !ObjectId.isValid(user_id)) {
    res.status(400);
    throw new Error("Template ID or user ID is not valid");
  }

  try {
    const updatedTemplate = await WorkoutTemplate.findOneAndUpdate(
      { _id: template_id, user_id },
      req.body
    );

    if (!updatedTemplate) {
      res.status(404);
      throw new Error("Template not found or no changes made");
    } else {
      res.status(200).json({
        _id: updatedTemplate._id,
        name: updatedTemplate.name,
        exercises: updatedTemplate.exercises,
      });
    }
  } catch (error) {
    res.status(500);
    console.error(error.message);
  }
});

//======================== GET WORKOUT TEMPLATE ========================//

// @desc Get user workout template by id
// @route GET /api/workout-template/:id
// @access PRIVATE

const getUserWorkoutTemplate = asyncHandler(async (req, res) => {
  const template_id = req.params.id;
  const user_id = req.user._id;

  if (!ObjectId.isValid(template_id) || !ObjectId.isValid(user_id)) {
    res.status(400);
    throw new Error("Template ID or user ID is not valid");
  }

  try {
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
      throw new Error("Workout template not found");
    }
  } catch (error) {
    res.status(500);
    console.error(error.message);
  }
});

//======================== DELETE WORKOUT TEMPLATE ========================//

// @desc Delete user workout template by id
// @route GET /api/workout-template/:id
// @access PRIVATE

const deleteWorkoutTemplate = asyncHandler(async (req, res) => {
  const template_id = req.params.id;
  const user_id = req.user._id;

  if (!ObjectId.isValid(template_id) || !ObjectId.isValid(user_id)) {
    res.status(400);
    throw new Error("Template ID or user ID is not valid");
  }

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
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//======================== GET TEMPLATE EXERCISES ========================//

// @desc Get template exercises
// @route GET /api/workout-template/:id/exercises/
// @access PRIVATE

const getWorkoutTemplateExercises = asyncHandler(async (req, res) => {
  const template_id = req.params.id;
  const user_id = req.user._id;

  if (!ObjectId.isValid(template_id) || !ObjectId.isValid(user_id)) {
    res.status(400);
    throw new Error("Template ID or user ID is not valid");
  }

  try {
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
  } catch (error) {
    res.status(500);
    console.error(error.message);
  }
});

module.exports = {
  addWorkoutTemplate,
  getUserWorkoutTemplates,
  updateWorkoutTemplate,
  getUserWorkoutTemplate,
  deleteWorkoutTemplate,
  getWorkoutTemplateExercises,
};
