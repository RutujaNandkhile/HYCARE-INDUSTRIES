const mongoose = require("mongoose");

const categories = [
  "CNC STRENGTH",
  "VMC STRENGTH",
  "INBUILD MACHINERY",
  "JOB'S",
  "SPOT WELDING ELECTRODES",
  "SPRINGS JOB'S",
];

const photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: categories,
    },

    image: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Photo", photoSchema);