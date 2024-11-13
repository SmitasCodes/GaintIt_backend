const WorkoutRecord = require("../models/workoutRecordModel");
const asyncHandler = require("express-async-handler");

//======================== ADD WORKOUT RECORD ========================//

// @desc Adds new workout record
// @route POST /api/workout-record/
// @access PRIVATE

const addWorkoutRecord = asyncHandler(async (req, res) => {
});

module.exports = {
  addWorkoutRecord,
};
