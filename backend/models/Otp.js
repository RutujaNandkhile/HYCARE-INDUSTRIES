const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["register", "login"],
      required: true,
    },

    userData: {
      name: String,
      email: String,
      password: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  }
);

module.exports = mongoose.model("Otp", otpSchema);