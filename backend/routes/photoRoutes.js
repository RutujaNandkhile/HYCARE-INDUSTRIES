const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Store the uploaded file in memory (not on disk) — required for serverless
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: upload a buffer to Cloudinary and resolve with the result
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "hycare-photos" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/* GET ALL PHOTOS */
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    console.error("Get Photos Error:", error);
    res.status(500).json({ message: "Failed to fetch photos" });
  }
});

/* ADD PHOTO */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const photo = new Photo({
      title: req.body.title,
      category: req.body.category,
      image: result.secure_url,
      imagePublicId: result.public_id,
    });

    await photo.save();
    res.json(photo);
  } catch (error) {
    console.error("Add Photo Error:", error);
    res.status(500).json({ message: "Failed to add photo", debug: error.message });
  }
});

/* UPDATE PHOTO */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      category: req.body.category,
    };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;
      updateData.imagePublicId = result.public_id;
    }

    const photo = await Photo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(photo);
  } catch (error) {
    console.error("Update Photo Error:", error);
    res.status(500).json({ message: "Failed to update photo", debug: error.message });
  }
});

/* DELETE PHOTO */
router.delete("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (photo?.imagePublicId) {
      await cloudinary.uploader.destroy(photo.imagePublicId);
    }

    await Photo.findByIdAndDelete(req.params.id);

    res.json({ message: "Photo Deleted" });
  } catch (error) {
    console.error("Delete Photo Error:", error);
    res.status(500).json({ message: "Failed to delete photo" });
  }
});

module.exports = router;