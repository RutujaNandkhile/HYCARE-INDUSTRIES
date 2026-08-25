const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("../routes/userRoutes");
const photoRoutes = require("../routes/photoRoutes");

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ========================================
// MONGODB
// ========================================

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Reusable middleware: make sure DB is connected before any route runs
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
    });
  }
};

// ========================================
// ROOT
// ========================================

app.get("/", async (req, res) => {
  await connectDB();

  res.json({
    message: "HYCARE Backend is running",
  });
});

// ========================================
// USERS
// ========================================

app.use("/users", ensureDB, userRoutes);

// ========================================
// PHOTOS
// ========================================

app.use("/photos", ensureDB, photoRoutes);

// ========================================
// EXPORT
// ========================================

module.exports = app;