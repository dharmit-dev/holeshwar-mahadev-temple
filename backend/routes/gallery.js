const express = require("express");
const path = require("path");
const fs = require("fs");
const GalleryImage = require("../models/GalleryImage");
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const router = express.Router();

/* Build public image URL */
const buildSrc = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/gallery/${filename}`;

/* ━━━━━━━━━━━━━━━━ PUBLIC ━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* GET /api/gallery */
router.get("/", async (req, res, next) => {
  try {
    const filter = { active: true };

    if (req.query.category && req.query.category !== "All") {
      filter.category = req.query.category;
    }

    const images = await GalleryImage.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    const data = images.map((img) => ({
      id: img._id,
      title: img.title,
      category: img.category,
      src: img.src,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
});

/* ━━━━━━━━━━━━━━━━ ADMIN ━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* GET /api/gallery/admin/all */
router.get("/admin/all", protect, async (req, res, next) => {
  try {
    const images = await GalleryImage.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      data: images,
    });
  } catch (err) {
    next(err);
  }
});

/* POST /api/gallery */
router.post("/", protect, upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }

    const { title, category, order } = req.body;

    if (!title || !category) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (_) {}

      return res.status(400).json({
        success: false,
        message: "Title and category are required.",
      });
    }

    const src = buildSrc(req, req.file.filename);

    const image = await GalleryImage.create({
      title,
      category,
      filename: req.file.filename,
      src,
      order: order ?? 0,
    });

    res.status(201).json({
      success: true,
      data: image,
    });
  } catch (err) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (_) {}
    }

    next(err);
  }
});

/* PUT /api/gallery/:id */
router.put("/:id", protect, upload.single("image"), async (req, res, next) => {
  try {
    const existing = await GalleryImage.findById(req.params.id);

    if (!existing) {
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (_) {}
      }

      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    const updates = {};

    if (req.body.title) updates.title = req.body.title;
    if (req.body.category) updates.category = req.body.category;
    if (req.body.order !== undefined) updates.order = req.body.order;

    if (req.file) {
      const oldPath = path.join(
        __dirname,
        "..",
        process.env.UPLOAD_DIR || "uploads",
        "gallery",
        existing.filename
      );

      try {
        fs.unlinkSync(oldPath);
      } catch (_) {}

      updates.filename = req.file.filename;
      updates.src = buildSrc(req, req.file.filename);
    }

    const image = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json({
      success: true,
      data: image,
    });
  } catch (err) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (_) {}
    }

    next(err);
  }
});

/* DELETE /api/gallery/:id */
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    const filePath = path.join(
      __dirname,
      "..",
      process.env.UPLOAD_DIR || "uploads",
      "gallery",
      image.filename
    );

    try {
      fs.unlinkSync(filePath);
    } catch (_) {}

    await image.deleteOne();

    res.json({
      success: true,
      message: "Image deleted.",
    });
  } catch (err) {
    next(err);
  }
});

/* PATCH /api/gallery/:id/toggle */
router.patch("/:id/toggle", protect, async (req, res, next) => {
  try {
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    image.active = !image.active;
    await image.save();

    res.json({
      success: true,
      data: image,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;