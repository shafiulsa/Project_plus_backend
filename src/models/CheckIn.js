const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    progressSummary: {
      type: String,
      required: true,
    },
    blockers: {
      type: String,
      default: "",
    },
    confidenceLevel: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    completionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckIn", checkInSchema);
