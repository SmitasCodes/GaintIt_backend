const mongoose = require("mongoose");

const WorkoutTemplate = mongoose.model(
  "WorkoutTemplate",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      exercises: [
        {
          exercise_name: { type: String, required: true, unique: true },
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = WorkoutTemplate;
