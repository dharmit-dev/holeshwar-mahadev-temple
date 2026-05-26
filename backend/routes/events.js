const express = require("express");
const { body, param, validationResult } = require("express-validator");
const Event   = require("../models/Event");
const { protect } = require("../middleware/auth");

const router = express.Router();

/* ── Validation rules ─────────────────────────────────── */
const eventValidation = [
  body("title").notEmpty().trim().withMessage("Title is required."),
  body("date").isISO8601().withMessage("Valid date (YYYY-MM-DD) is required."),
  body("category")
    .isIn(["Festival", "Shibir", "Mahotsav", "Satsang", "Other"])
    .withMessage("Invalid category."),
  body("description").notEmpty().trim().withMessage("Description is required."),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }
  next();
};

/* ━━━━━━━━━━━━━━━━  PUBLIC ROUTES  ━━━━━━━━━━━━━━━━━━━━ */

/* GET /api/events  — all active events, sorted by date asc */
router.get("/", async (req, res, next) => {
  try {
    const { category, highlight } = req.query;
    const filter = { active: true };
    if (category)  filter.category  = category;
    if (highlight !== undefined) filter.highlight = highlight === "true";

    const events = await Event.find(filter).sort({ date: 1, order: 1 });

    /* Return shape matching frontend constants exactly:
       { id, title, date (ISO string), endDate, category, description, highlight } */
    const data = events.map((e) => ({
      id:          e._id,
      title:       e.title,
      date:        e.date.toISOString().split("T")[0],
      endDate:     e.endDate ? e.endDate.toISOString().split("T")[0] : "",
      category:    e.category,
      description: e.description,
      highlight:   e.highlight,
    }));

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

/* GET /api/events/:id */
router.get("/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || !event.active) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
});

/* ━━━━━━━━━━━━━━━━  ADMIN ROUTES  ━━━━━━━━━━━━━━━━━━━━━ */

/* POST /api/events */
router.post("/", protect, eventValidation, validate, async (req, res, next) => {
  try {
    const { title, date, endDate, category, description, highlight, order } = req.body;
    const event = await Event.create({
      title, date, endDate: endDate || null,
      category, description,
      highlight: !!highlight,
      order: order ?? 0,
    });
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
});

/* PUT /api/events/:id */
router.put("/:id", protect, eventValidation, validate, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, endDate: req.body.endDate || null },
      { new: true, runValidators: true }
    );
    if (!event) return res.status(404).json({ success: false, message: "Event not found." });
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
});

/* DELETE /api/events/:id  — soft delete */
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!event) return res.status(404).json({ success: false, message: "Event not found." });
    res.json({ success: true, message: "Event deleted." });
  } catch (err) {
    next(err);
  }
});

/* PATCH /api/events/:id/highlight — toggle highlight quickly */
router.patch("/:id/highlight", protect, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found." });
    event.highlight = !event.highlight;
    await event.save();
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
