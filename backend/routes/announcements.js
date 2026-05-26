  const express      = require("express");
  const { body, validationResult } = require("express-validator");
  const Announcement = require("../models/Announcement");
  const { protect }  = require("../middleware/auth");

  const router = express.Router();

  const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    next();
  };

  /* ━━━━━━━━━━━━━━━━  PUBLIC  ━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  /* GET /api/announcements
    Returns active announcements that haven't expired.
    Frontend AnnouncementTicker expects an array of strings. */
  router.get("/", async (req, res, next) => {
    try {
      const now = new Date();
      const announcements = await Announcement.find({
        active: true,
        $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
      }).sort({ order: 1, createdAt: 1 });

      /* Return plain text array — matches how constants.js ANNOUNCEMENTS is used */
      const data = announcements.map((a) => a.text);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  });

  /* ━━━━━━━━━━━━━━━━  ADMIN  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  /* GET /api/announcements/admin/all — full records for dashboard */
  router.get("/admin/all", protect, async (req, res, next) => {
    try {
      const all = await Announcement.find().sort({ order: 1, createdAt: 1 });
      res.json({ success: true, data: all });
    } catch (err) {
      next(err);
    }
  });

  /* POST /api/announcements */
  router.post(
    "/",
    protect,
    [body("text").notEmpty().trim().withMessage("Announcement text is required.")],
    validate,
    async (req, res, next) => {
      try {
        const { text, order, expiresAt } = req.body;
        const ann = await Announcement.create({
          text,
          order: order ?? 0,
          expiresAt: expiresAt || null,
        });
        res.status(201).json({ success: true, data: ann });
      } catch (err) {
        next(err);
      }
    }
  );

  /* PUT /api/announcements/:id */
  router.put(
    "/:id",
    protect,
    [body("text").notEmpty().trim().withMessage("Text is required.")],
    validate,
    async (req, res, next) => {
      try {
        const ann = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
          new: true, runValidators: true,
        });
        if (!ann) return res.status(404).json({ success: false, message: "Announcement not found." });
        res.json({ success: true, data: ann });
      } catch (err) {
        next(err);
      }
    }
  );

  /* DELETE /api/announcements/:id — hard delete (they're short-lived) */
  router.delete("/:id", protect, async (req, res, next) => {
    try {
      const ann = await Announcement.findByIdAndDelete(req.params.id);
      if (!ann) return res.status(404).json({ success: false, message: "Announcement not found." });
      res.json({ success: true, message: "Announcement deleted." });
    } catch (err) {
      next(err);
    }
  });

  /* PATCH /api/announcements/:id/toggle — toggle active */
  router.patch("/:id/toggle", protect, async (req, res, next) => {
    try {
      const ann = await Announcement.findById(req.params.id);
      if (!ann) return res.status(404).json({ success: false, message: "Announcement not found." });
      ann.active = !ann.active;
      await ann.save();
      res.json({ success: true, data: ann });
    } catch (err) {
      next(err);
    }
  });

  module.exports = router;
