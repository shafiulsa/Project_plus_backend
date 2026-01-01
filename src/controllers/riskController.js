const Risk = require("../models/Risk");
const Project = require("../models/Project");
const { calculateHealthScore } = require("../utils/healthScore");

const getRisks = async (req, res) => {
  try {
    const risks = await Risk.find()
      .populate("project", "name")
      .populate("createdBy", "name email");
    res.json(risks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRisk = async (req, res) => {
  const { project, title, severity, mitigationPlan } = req.body;
  try {
    const risk = await Risk.create({
      project,
      title,
      severity,
      mitigationPlan,
      createdBy: req.user._id,
    });
    // Update project health score
    const updatedProject = await Project.findByIdAndUpdate(
      project,
      { healthScore: calculateHealthScore(await Project.findById(project)) },
      { new: true }
    );
    res.status(201).json(risk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRisk = async (req, res) => {
  try {
    const risk = await Risk.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!risk) {
      return res.status(404).json({ message: "Risk not found" });
    }
    // Update project health score
    const updatedProject = await Project.findByIdAndUpdate(
      risk.project,
      { healthScore: calculateHealthScore(await Project.findById(risk.project)) },
      { new: true }
    );
    res.json(risk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getRisks, createRisk, updateRisk };
