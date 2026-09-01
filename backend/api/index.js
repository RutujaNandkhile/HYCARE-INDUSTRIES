require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ===== CORS =====
const allowedOrigins = [
  "http://localhost:5173",
  "https://hycare-industries-web.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ===== ENV CHECK =====
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Loaded" : "Missing");
console.log("RESEND_FROM_EMAIL:", process.env.RESEND_FROM_EMAIL || "Missing");

// ===== DB =====
let isConnected = false;
const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) return;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing");
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB connected");
};

const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB error:", error.message);
    return res.status(500).json({ success: false, message: "Database connection failed" });
  }
};

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "HYCARE Backend is running" });
});

app.use("/users", ensureDB, require("../routes/userRoutes"));
app.use("/photos", ensureDB, require("../routes/photoRoutes"));

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error", debug: err.message });
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local server on http://localhost:${PORT}`));
}

module.exports = app;