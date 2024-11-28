const WorkoutTemplate = require("../models/workoutTemplateModel");
const WorkoutRecord = require("../models/workoutRecordModel");
const asyncHandler = require("express-async-handler");

//======================== ADD WORKOUT RECORD ========================//

// @desc Adds new workout record
// @route POST /api/workout-record/
// @access PRIVATE

const addWorkoutRecord = asyncHandler(async (req, res) => {
  const { template_id, exercises } = req.body;
  const user_id = req.user._id;

  if (!template_id) {
    res.status(400);
    throw new Error("Template ID is required.");
  }

  const template = await WorkoutTemplate.findOne({ _id: template_id, user_id });
  if (!template) {
    res.status(404);
    throw new Error(
      "Workout template not found or does not belong to this user."
    );
  }

  // Exercises validation, checking if exercises names matches templates exercises names. Also checking if reps/weight/sets are positive and if reps array length is equal sets array.
  const templateExercisesNames = template.exercises.map((e) => e.exercise_name);
  const invalidExercisesNames = exercises.filter(
    (e) => !templateExercisesNames.includes(e.exercise_name)
  );

  if (invalidExercisesNames.length > 0) {
    res.status(400);
    throw new Error("Some exercises do not match the selected template.");
  }

  const invalidExercisesData = exercises.filter(
    (e) =>
      !e.weight ||
      !e.reps ||
      !e.sets ||
      e.weight <= 0 ||
      e.reps <= 0 ||
      e.sets <= 0 ||
      e.reps.length != e.sets
  );

  if (invalidExercisesData.length > 0) {
    res.status(400);
    throw new Error("Some exercises have invalid data (weight, reps, sets).");
  }

  const workoutRecord = await WorkoutRecord.create({
    template_id,
    template_name: template.name,
    user_id,
    exercises,
  });

  if (!workoutRecord) {
    res.status(500).json("Failed to create workout record.");
    return;
  }

  res.status(201).json({ workoutRecord });
});

module.exports = {
  addWorkoutRecord,
};
