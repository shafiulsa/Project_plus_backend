const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware").verifyToken;
const authorizeRoles = require("../middleware/roleMiddleware");
const { getRisks, createRisk, updateRisk } = require("../controllers/riskController");
// const { checkRole } = require("../middlewares/roleMiddleware");

// router.get("/", verifyToken, authorizeRoles(["admin", "employee"]), getRisks);
router.get("/",  getRisks);
router.post("/", verifyToken, authorizeRoles("employee"), createRisk);
router.put("/:id", verifyToken, authorizeRoles("admin", "employee"), updateRisk);

module.exports = router;
