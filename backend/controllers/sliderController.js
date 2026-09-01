const Slider = require("../models/Slider");
const cloudinary = require("../config/cloudinary");
const { uploadBufferToCloudinary } = require("../utils/cloudinaryUpload");

// GET ALL SLIDERS
const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ createdAt: -1 });

    res.status(200).json(sliders);
  } catch (err) {
    console.error("getSliders error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ADD SLIDER
const addSlider = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const result = await uploadBufferToCloudinary(
      req.file.buffer,
      "hycare/sliders"
    );

    const slider = await Slider.create({
      title,
      image: result.secure_url,
      imagePublicId: result.public_id,
    });

    res.status(201).json(slider);
  } catch (err) {
    console.error("addSlider error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE SLIDER
const updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({
        message: "Slider not found",
      });
    }

    const { title } = req.body;

    if (title) {
      slider.title = title;
    }

    if (req.file) {
      // Delete old Cloudinary image
      if (slider.imagePublicId) {
        await cloudinary.uploader
          .destroy(slider.imagePublicId)
          .catch(() => {});
      }

      // Upload new image
      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        "hycare/sliders"
      );

      slider.image = result.secure_url;
      slider.imagePublicId = result.public_id;
    }

    await slider.save();

    res.status(200).json(slider);
  } catch (err) {
    console.error("updateSlider error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE SLIDER
const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({
        message: "Slider not found",
      });
    }

    // Delete Cloudinary image
    if (slider.imagePublicId) {
      await cloudinary.uploader
        .destroy(slider.imagePublicId)
        .catch(() => {});
    }

    // Delete database record
    await slider.deleteOne();

    res.status(200).json({
      message: "Slider deleted",
    });
  } catch (err) {
    console.error("deleteSlider error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getSliders,
  addSlider,
  updateSlider,
  deleteSlider,
};