require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ========================================
// CORS
// ========================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://hycare-industries-web.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("Blocked by CORS:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  })
);

// ========================================
// BODY PARSER
// ========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// UPLOADS
// ========================================

app.use("/uploads", express.static("uploads"));

// ========================================
// ENV CHECK
// ========================================

console.log("=================================");
console.log("Environment Check");
console.log("=================================");

console.log(
  "MONGO_URI:",
  process.env.MONGO_URI ? "Loaded" : "Missing"
);

console.log(
  "RESEND_API_KEY:",
  process.env.RESEND_API_KEY ? "Loaded" : "Missing"
);

console.log(
  "RESEND_FROM_EMAIL:",
  process.env.RESEND_FROM_EMAIL || "Missing"
);

console.log(
  "FRONTEND_URL:",
  process.env.FRONTEND_URL || "Missing"
);

console.log("=================================");

// ========================================
// MONGODB ATLAS
// ========================================

let isConnected = false;

const connectDB = async () => {
  if (
    isConnected &&
    mongoose.connection.readyState === 1
  ) {
    return;
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("✅ MongoDB Atlas connected successfully");
  } catch (error) {
    isConnected = false;

    console.error(
      "❌ MongoDB Atlas connection error:",
      error.message
    );

    throw error;
  }
};

// ========================================
// DATABASE MIDDLEWARE
// ========================================

const ensureDB = async (req, res, next) => {
  try {
    await connectDB();

    next();
  } catch (error) {
    console.error(
      "Database middleware error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

// ========================================
// ROOT
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HYCARE Backend is running",
  });
});

// ========================================
// USER ROUTES
// ========================================

try {
  const userRoutes = require("../routes/userRoutes");

  app.use("/users", ensureDB, userRoutes);

  console.log("✅ User routes loaded successfully");
} catch (error) {
  console.error(
    "❌ Failed to load userRoutes:",
    error.message
  );

  app.use("/users", (req, res) => {
    res.status(500).json({
      success: false,
      message: "User routes failed to load",
      debug: error.message,
    });
  });
}

// ========================================
// PHOTO ROUTES
// ========================================

try {
  const photoRoutes = require("../routes/photoRoutes");

  app.use("/photos", ensureDB, photoRoutes);

  console.log("✅ Photo routes loaded successfully");
} catch (error) {
  console.error(
    "❌ Failed to load photoRoutes:",
    error.message
  );

  app.use("/photos", (req, res) => {
    res.status(500).json({
      success: false,
      message: "Photo routes failed to load",
      debug: error.message,
    });
  });
}

// ========================================
// 404
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ========================================
// GLOBAL ERROR
// ========================================

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",

    debug:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.message,
  });
});

// ========================================
// LOCAL SERVER
// ========================================

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `🚀 Local server running on http://localhost:${PORT}`
    );
  });
}

// ========================================
// VERCEL
// ========================================

module.exports = app;