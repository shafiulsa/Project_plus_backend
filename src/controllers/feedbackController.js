const Feedback = require("../models/Feedback");
const Project = require("../models/Project");
const { calculateHealthScore } = require("../utils/healthScore");

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("project", "name")
      .populate("client", "name email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createFeedback = async (req, res) => {
  const { project, satisfactionRating, communicationRating, comments, isIssueFlagged } = req.body;
  try {
    const feedback = await Feedback.create({
      project,
      client: req.user._id,
      satisfactionRating,
      communicationRating,
      comments,
      isIssueFlagged,
    });
    // Update project health score
    const updatedProject = await Project.findByIdAndUpdate(
      project,
      { healthScore: calculateHealthScore(await Project.findById(project)) },
      { new: true }
    );
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getFeedbacks, createFeedback };
