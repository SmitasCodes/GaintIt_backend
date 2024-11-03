const mongoose = require("mongoose");

const WorkoutTemplate = mongoose.model(
  "WorkoutTemplate",
  new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      exercises: [
        {
          exercise_name: { type: String, required: true },
          sets: { type: Number, default: 0 },
          repetitions: { type: Number, default: 0 },
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = WorkoutTemplate;
