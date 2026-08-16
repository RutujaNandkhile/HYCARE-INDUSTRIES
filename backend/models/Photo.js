const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Photo", photoSchema);