const Photo = require("../models/Photo");
const cloudinary = require("../config/cloudinary");

const { uploadBufferToCloudinary } = require("../utils/cloudinaryUpload");

const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });

    res.json(photos);
  } catch (err) {
    console.error("getPhotos error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const addPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        message: "Title and category are required",
      });
    }

    const result = await uploadBufferToCloudinary(
      req.file.buffer,
      "hycare/photos"
    );

    const photo = await Photo.create({
      title,
      category,
      image: result.secure_url,
      imagePublicId: result.public_id,
    });

    res.status(201).json(photo);
  } catch (err) {
    console.error("addPhoto error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        message: "Photo not found",
      });
    }

    const { title, category } = req.body;

    if (title) {
      photo.title = title;
    }

    if (category) {
      photo.category = category;
    }

    // Replace old image if a new image was uploaded
    if (req.file) {
      if (photo.imagePublicId) {
        await cloudinary.uploader
          .destroy(photo.imagePublicId)
          .catch(() => {});
      }

      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        "hycare/photos"
      );

      photo.image = result.secure_url;
      photo.imagePublicId = result.public_id;
    }

    await photo.save();

    res.json(photo);
  } catch (err) {
    console.error("updatePhoto error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        message: "Photo not found",
      });
    }

    // Delete image from Cloudinary
    if (photo.imagePublicId) {
      await cloudinary.uploader
        .destroy(photo.imagePublicId)
        .catch(() => {});
    }

    // Delete database record
    await photo.deleteOne();

    res.json({
      message: "Photo deleted",
    });
  } catch (err) {
    console.error("deletePhoto error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getPhotos,
  addPhoto,
  updatePhoto,
  deletePhoto,
};