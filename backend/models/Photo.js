const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String, // full Cloudinary secure_url
  imagePublicId: String, // Cloudinary public_id, needed to delete the image later
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Photo", photoSchema);