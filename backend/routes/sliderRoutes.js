const express = require("express");

const {
  getSliders,
  addSlider,
  updateSlider,
  deleteSlider,
} = require("../controllers/sliderController");

const upload = require("../middleware/upload");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSliders);

router.post(
  "/",
  protect,
  upload.single("image"),
  addSlider
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateSlider
);

router.delete(
  "/:id",
  protect,
  deleteSlider
);

module.exports = router;