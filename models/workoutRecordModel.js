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
          reps: { type: Number, required: true },
          weight: { type: Number, required: true },
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = WorkoutRecord;
