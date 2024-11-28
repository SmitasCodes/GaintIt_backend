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

  const template = await WorkoutTemplate.findById(template_id);

  console.log(template)

  const workoutRecord = await WorkoutRecord.create({
    template_id,
    template_name: template.name,
    user_id,
    exercises,
  });

  if (workoutRecord) {
    res.status(201).json({ workoutRecord });
  } else {
    res.status(400);
    throw new Error("Error when trying to add record");
  }
});

module.exports = {
  addWorkoutRecord,
};
