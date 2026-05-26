const express = require("express");
const { body, validationResult } = require("express-validator");
const FAQ     = require("../models/FAQ");
const { protect } = require("../middleware/auth");

const router = express.Router();

const faqValidation = [
  body("q").notEmpty().trim().withMessage("Question (q) is required."),
  body("a").notEmpty().trim().withMessage("Answer (a) is required."),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }
  next();
};

/* ━━━━━━━━━━━━━━━━  PUBLIC  ━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* GET /api/faqs */
router.get("/", async (req, res, next) => {
  try {
    const faqs = await FAQ.find({ active: true }).sort({ order: 1, createdAt: 1 });

    /* Match frontend shape: { id, q, a } */
    const data = faqs.map((f) => ({ id: f._id, q: f.q, a: f.a }));
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

/* ━━━━━━━━━━━━━━━━  ADMIN  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* GET /api/faqs/admin/all  — includes inactive, for dashboard table */
router.get("/admin/all", protect, async (req, res, next) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: faqs });
  } catch (err) {
    next(err);
  }
});

/* POST /api/faqs */
router.post("/", protect, faqValidation, validate, async (req, res, next) => {
  try {
    const { q, a, order } = req.body;
    const faq = await FAQ.create({ q, a, order: order ?? 0 });
    res.status(201).json({ success: true, data: faq });
  } catch (err) {
    next(err);
  }
});

/* PUT /api/faqs/:id */
router.put("/:id", protect, faqValidation, validate, async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!faq) return res.status(404).json({ success: false, message: "FAQ not found." });
    res.json({ success: true, data: faq });
  } catch (err) {
    next(err);
  }
});

/* DELETE /api/faqs/:id  — soft delete */
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    if (!faq) return res.status(404).json({ success: false, message: "FAQ not found." });
    res.json({ success: true, message: "FAQ deleted." });
  } catch (err) {
    next(err);
  }
});

/* PATCH /api/faqs/reorder  — accept [{id, order}] array to bulk-update order */
router.patch("/reorder", protect, async (req, res, next) => {
  try {
    const items = req.body; // [{ id, order }]
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Array of {id, order} expected." });
    }
    await Promise.all(
      items.map(({ id, order }) => FAQ.findByIdAndUpdate(id, { order }))
    );
    res.json({ success: true, message: "Order updated." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
