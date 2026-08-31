require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ========================================
// CORS — हे सर्वात आधी लावा, कोणताही route
// लोड होण्याआधी. यामुळे पुढे कुठलाही route
// क्रॅश झाला तरी किमान CORS headers तरी
// आधीच attach झालेले राहतात.
// ========================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://hycare-industries-vuqh.vercel.app",
  // इथे तुमचं deploy झालेलं FRONTEND URL टाका, उदा:
  // "https://hycare-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman / server-to-server सारख्या no-origin request्ससाठी allow
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
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
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      debug: error.message,
    });
  }
};

// ========================================
// ROOT
// ========================================

app.get("/", async (req, res) => {
  res.json({ message: "HYCARE Backend is running" });
});

// ========================================
// ROUTES — try/catch मध्ये लोड करा, जेणेकरून
// एखादं dependency (उदा. cloudinary/multer)
// missing असेल तर स्पष्ट error दिसेल, आणि
// संपूर्ण app silently क्रॅश होणार नाही.
// ========================================

try {
  const userRoutes = require("../routes/userRoutes");
  app.use("/users", ensureDB, userRoutes);
} catch (error) {
  console.error("Failed to load userRoutes:", error);
  app.use("/users", (req, res) => {
    res.status(500).json({
      message: "userRoutes failed to load",
      debug: error.message,
    });
  });
}

try {
  const photoRoutes = require("../routes/photoRoutes");
  app.use("/photos", ensureDB, photoRoutes);
} catch (error) {
  console.error("Failed to load photoRoutes:", error);
  app.use("/photos", (req, res) => {
    res.status(500).json({
      message: "photoRoutes failed to load",
      debug: error.message,
    });
  });
}

// ========================================
// 404 HANDLER
// ========================================

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ========================================
// ERROR HANDLER
// ========================================

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Internal server error",
    debug: err.message,
  });
});

// ========================================
// LOCAL DEV ONLY
// ========================================

if (require.main === module) {
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Local server running on http://localhost:${PORT}`);
});
}

module.exports = app;