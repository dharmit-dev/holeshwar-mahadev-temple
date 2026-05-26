const express = require("express");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const ContactMessage = require("../models/ContactMessage");
const { protect } = require("../middleware/auth");

const router = express.Router();

/* Rate-limit contact form: 5 submissions per 15 min per IP */
const contactLimiter = rateLimit({
  windowMs:  15 * 60 * 1000,
  max:       5,
  message:   { success: false, message: "Too many messages. Please wait 15 minutes." },
  standardHeaders: true,
  legacyHeaders:   false,
});

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }
  next();
};

/* ━━━━━━━━━━━━━━━━  PUBLIC  ━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* POST /api/contact */
router.post(
  "/",
  contactLimiter,
  [
    body("name").notEmpty().trim().withMessage("Name is required."),
    body("email").isEmail().withMessage("Valid email is required."),
    body("message").notEmpty().trim().isLength({ min: 10 }).withMessage("Message must be at least 10 characters."),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      await ContactMessage.create({ name, email, phone, subject, message });
      res.status(201).json({
        success: true,
        message: "🙏 Your message has been received. We will get back to you soon.",
      });
    } catch (err) {
      next(err);
    }
  }
);

/* ━━━━━━━━━━━━━━━━  ADMIN  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* GET /api/contact/admin/messages — paginated list */
router.get("/admin/messages", protect, async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;

    const filter = {};
    if (req.query.read === "false") filter.read = false;

    const [messages, total] = await Promise.all([
      ContactMessage.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ContactMessage.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data:    messages,
      meta:    { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
});

/* PATCH /api/contact/admin/messages/:id/read — mark as read */
router.patch("/admin/messages/:id/read", protect, async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ success: false, message: "Message not found." });
    res.json({ success: true, data: msg });
  } catch (err) {
    next(err);
  }
});

/* DELETE /api/contact/admin/messages/:id */
router.delete("/admin/messages/:id", protect, async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: "Message not found." });
    res.json({ success: true, message: "Message deleted." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
