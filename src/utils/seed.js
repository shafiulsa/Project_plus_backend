require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Project = require("../models/Project");
const Risk = require("../models/Risk");
const Feedback = require("../models/Feedback");
const CheckIn = require("../models/CheckIn");
const connectDB = require("../config/dbConfig");

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Risk.deleteMany();
    await Feedback.deleteMany();
    await CheckIn.deleteMany();

    console.log("Old data cleared");

    // ===== USERS =====
    const password = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@test.com",
        password,
        role: "admin",
      },
      {
        name: "Employee One",
        email: "employee1@test.com",
        password,
        role: "employee",
      },
      {
        name: "Employee Two",
        email: "employee2@test.com",
        password,
        role: "employee",
      },
      {
        name: "Client One",
        email: "client1@test.com",
        password,
        role: "client",
      },
      {
        name: "Client Two",
        email: "client2@test.com",
        password,
        role: "client",
      },
    ]);

    const admin = users[0];
    const emp1 = users[1];
    const emp2 = users[2];
    const client1 = users[3];

    console.log("Users seeded");

    // ===== PROJECT =====
    const project = await Project.create({
      name: "Project Pulse",
      description: "Client Feedback & Project Health Tracker",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-06-30"),
      client: client1._id,
      employees: [emp1._id, emp2._id],
    });

    console.log("Project seeded");

    // ===== RISK =====
    await Risk.create({
      project: project._id,
      title: "Delay in feature delivery",
      severity: "High",
      mitigationPlan: "Increase resources and weekly review",
      createdBy: admin._id,
    });

    console.log("Risk seeded");

    // ===== FEEDBACK =====
    await Feedback.create({
      project: project._id,
      client: client1._id,
      satisfactionRating: 4,
      communicationRating: 5,
      comments: "Good progress so far",
    });

    console.log("Feedback seeded");

    // ===== CHECK-IN =====
    await CheckIn.create({
      project: project._id,
      employee: emp1._id,
      progressSummary: "Completed API integration",
      blockers: "None",
      confidenceLevel: 4,
      completionPercentage: 60,
    });

    console.log("Check-in seeded");

    console.log("✅ Seeding completed successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
