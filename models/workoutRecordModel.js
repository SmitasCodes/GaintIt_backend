const mongoose = require("mongoose");

const WorkoutRecord = mongoose.model(
  "WorkoutTemplate",
  new mongoose.Schema(
    {
      template_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkoutTemplate",
        required: true,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      exercises: [
        {
          exercise_template: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WorkoutTemplate.exercises",
            required: true,
          },
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
