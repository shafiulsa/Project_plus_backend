const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware").verifyToken;
const authorizeRoles = require("../middleware/roleMiddleware");
const { getUsers, getUserById } = require("../controllers/userController");
// const { checkRole } = require("../middlewares/roleMiddleware");

// GET all users (Admin only)
router.get("/", getUsers);

// GET single user by ID
router.get("/:id", verifyToken, authorizeRoles(["admin"]), getUserById);


module.exports = router;
