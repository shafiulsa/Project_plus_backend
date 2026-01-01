
const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const checkInRoutes = require("./src/routes/checkInRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const riskRoutes = require("./src/routes/riskRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "API running on Vercel" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/checkins", checkInRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/risks", riskRoutes);

module.exports = app;
