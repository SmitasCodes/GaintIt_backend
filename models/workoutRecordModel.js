const mongoose = require("mongoose");

const WorkoutRecord = mongoose.model(
  "WorkoutRecord",
  new mongoose.Schema(
    {
      template_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkoutTemplate",
        required: true,
      },
      template_name: {
        type: String,
        required: true,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      exercises: [
        {
          exercise_name: { type: String, required: true },
          sets: { type: Number, required: true },
          reps: [Number],
          weight: { type: Number, required: true },
        },
      ],
      workout_date: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = WorkoutRecord;
