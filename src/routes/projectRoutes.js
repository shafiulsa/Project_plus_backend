const express = require("express");
const router = express.Router();
// const { protect, checkRole } = require("../middlewares/authMiddleware");
const verifyToken = require("../middleware/authMiddleware").verifyToken;
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addComment
} = require("../controllers/projectController");

router.get("/", verifyToken, getProjects);
router.get("/:id", verifyToken, getProjectById);
router.post("/", verifyToken, authorizeRoles("admin"), createProject);
router.put("/:id", verifyToken, authorizeRoles("admin"), updateProject);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteProject);

module.exports = router;
