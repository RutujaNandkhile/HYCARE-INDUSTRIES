const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    otp: {
      type: String,
      required: true,
    },

    type: {
      type: String,

      enum: [
        "register",
        "login",
      ],

      required: true,
    },

    userData: {
      name: {
        type: String,
        trim: true,
      },

      email: {
        type: String,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
      },
    },

    createdAt: {
      type: Date,

      default: Date.now,

      expires: 600,
    },
  }
);

module.exports =
  mongoose.model("Otp", otpSchema);