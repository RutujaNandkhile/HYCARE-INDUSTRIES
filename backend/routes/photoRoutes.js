const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* GET ALL PHOTOS */
router.get("/", async (req, res) => {
  const photos = await Photo.find().sort({ createdAt: -1 });
  res.json(photos);
});

/* ADD PHOTO */
router.post("/", upload.single("image"), async (req, res) => {

  const photo = new Photo({
    title: req.body.title,
    category: req.body.category,
    image: req.file.filename
  });

  await photo.save();
  res.json(photo);
});

/* UPDATE PHOTO */
router.put("/:id", upload.single("image"), async (req, res) => {

  const updateData = {
    title: req.body.title,
    category: req.body.category
  };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  const photo = await Photo.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(photo);
});

/* DELETE PHOTO */
router.delete("/:id", async (req, res) => {

  await Photo.findByIdAndDelete(req.params.id);

  res.json({ message: "Photo Deleted" });

});

module.exports = router;