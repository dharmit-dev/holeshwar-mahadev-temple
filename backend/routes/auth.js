const express = require("express");
const jwt     = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Admin   = require("../models/Admin");
const { protect } = require("../middleware/auth");

const router = express.Router();

/* ── Helper: sign JWT ────────────────────────────────── */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

/* ── POST /api/auth/login ────────────────────────────── */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
      }

      const { email, password } = req.body;

      /* Explicitly select password (it's select:false in schema) */
      const admin = await Admin.findOne({ email }).select("+password");
      if (!admin || !(await admin.comparePassword(password))) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }

      const token = signToken(admin._id);

      res.json({
        success: true,
        token,
        admin: {
          id:    admin._id,
          name:  admin.name,
          email: admin.email,
          role:  admin.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/* ── GET /api/auth/me ────────────────────────────────── */
/* Frontend can call this on dashboard load to verify token is still valid */
router.get("/me", protect, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = router;
