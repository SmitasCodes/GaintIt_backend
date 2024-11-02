const mongoose = require("mongoose");

const WorkoutTemplate =
  ("WorkoutTemplate",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
  ));

module.exports = WorkoutTemplate;
