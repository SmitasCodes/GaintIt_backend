const WorkoutTemplate = require("../models/workoutTemplateModel");
const WorkoutRecord = require("../models/workoutRecordModel");
const asyncHandler = require("express-async-handler");

//======================== ADD WORKOUT RECORD ========================//

// @desc Adds new workout record
// @route POST /api/workout-record/
// @access PRIVATE

const addWorkoutRecord = asyncHandler(async (req, res) => {
  const { template_id, exercises, workout_date } = req.body;
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

  if (!workout_date || isNaN(new Date(workout_date).getTime())) {
    throw new Error("Invalid date provided.");
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

//======================== GET WORKOUTS RECORDS ========================//

// @desc Gets all user workout records
// @route POST /api/workout-record/
// @access PRIVATE

const getUserWorkoutRecords = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  const workoutRecords = await WorkoutRecord.find({ user_id });

  if (workoutRecords && workoutRecords.length > 0) {
    res.status(200).json({
      records: workoutRecords,
    });
  } else {
    res.status(404);
    throw new Error("No workout records found");
  }
});

//======================== DELETE WORKOUT RECORD ========================//

// @desc Delete workout record
// @route POST /api/workout-record/:id
// @access PRIVATE

const deleteWorkoutRecord = asyncHandler(async (req, res) => {
  const record_id = req.params.id;
  const user_id = req.user._id;

  try {
    const deleteRecord = await WorkoutRecord.deleteOne({
      user_id,
      _id: record_id,
    });

    console.log(deleteRecord);

    if (deleteRecord.deletedCount === 0) {
      res.status(404);
      throw new Error("Workout record not found");
    }

    res.status(200).json({ message: "Workout record deleted" });
  } catch(error) {
    res.status(500);
    throw new Error( error.message );
  }
});

module.exports = {
  addWorkoutRecord,
  getUserWorkoutRecords,
  deleteWorkoutRecord,
};
