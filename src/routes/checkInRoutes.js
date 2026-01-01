const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware").verifyToken;
const authorizeRoles = require("../middleware/roleMiddleware");
// const { protect, checkRole } = require("../middlewares/authMiddleware");
const { getCheckIns, createCheckIn } = require("../controllers/checkInController");
// const { checkRole } = require("../middlewares/roleMiddleware");

// router.get("/", verifyToken, authorizeRoles(["admin", "employee"]), getCheckIns);
// router.post("/", verifyToken, authorizeRoles(["employee"]), createCheckIn);
router.get("/", getCheckIns);
router.post("/", verifyToken, authorizeRoles("employee"), createCheckIn);


module.exports = router;
