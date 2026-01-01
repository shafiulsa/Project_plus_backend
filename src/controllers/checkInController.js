const CheckIn = require("../models/CheckIn");
const Project = require("../models/Project");
const { calculateHealthScore } = require("../utils/healthScore");

const getCheckIns = async (req, res) => {
  try {
    const checkIns = await CheckIn.find()
      .populate("project", "name")
      .populate("employee", "name email");
    res.json(checkIns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCheckIn = async (req, res) => {
  const { project, progressSummary, blockers, confidenceLevel, completionPercentage } = req.body;
  try {
    const checkIn = await CheckIn.create({
      project,
      employee: req.user._id,
      progressSummary,
      blockers,
      confidenceLevel,
      completionPercentage,
    });
    // Update project health score
    const updatedProject = await Project.findByIdAndUpdate(
      project,
      { healthScore: calculateHealthScore(await Project.findById(project)) },
      { new: true }
    );
    res.status(201).json(checkIn);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCheckIns, createCheckIn };
