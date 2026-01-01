const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware").verifyToken;
const authorizeRoles = require("../middleware/roleMiddleware");const { getFeedbacks, createFeedback } = require("../controllers/feedbackController");
// const { checkRole } = require("../middlewares/roleMiddleware");

router.get("/", verifyToken, authorizeRoles(["admin", "client"]), getFeedbacks);
router.post("/", verifyToken, authorizeRoles("client"), createFeedback);

module.exports = router;
