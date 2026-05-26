/* ── Environment ─────────────────────────────────────── */
require("dotenv").config();

const express    = require("express");
const cors       = require("cors");
const helmet     = require("helmet");
const morgan     = require("morgan");
const path       = require("path");
const rateLimit  = require("express-rate-limit");

const connectDB      = require("./config/db");
const errorHandler   = require("./middleware/errorHandler");

/* ── Route imports ───────────────────────────────────── */
const authRoutes         = require("./routes/auth");
const eventsRoutes       = require("./routes/events");
const faqsRoutes         = require("./routes/faqs");
const announcementsRoutes = require("./routes/announcements");
const galleryRoutes      = require("./routes/gallery");
const contactRoutes      = require("./routes/contact");

/* ── Connect to MongoDB ──────────────────────────────── */
connectDB();

/* ── App setup ───────────────────────────────────────── */
const app = express();

/* ── Security headers ────────────────────────────────── */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // allow images to be loaded by frontend
  })
);

/* ── CORS ────────────────────────────────────────────── */
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (e.g. curl, Postman, mobile)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

/* ── Global rate limit ───────────────────────────────── */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max:      200,               // 200 requests per window per IP
    standardHeaders: true,
    legacyHeaders:   false,
    message: { success: false, message: "Too many requests. Try again later." },
  })
);

/* ── Body parsing ────────────────────────────────────── */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ── Logging ─────────────────────────────────────────── */
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* ── Static files – serve uploaded images ────────────── */
app.use(
  "/uploads",
  express.static(path.join(__dirname, process.env.UPLOAD_DIR || "uploads"))
);

/* ── Health check ────────────────────────────────────── */
app.get("/api/health", (_req, res) =>
  res.json({
    success: true,
    status:  "ok",
    temple:  "Holeshwar Mahadev Mandir",
    time:    new Date().toISOString(),
  })
);

/* ── API routes ──────────────────────────────────────── */
app.use("/api/auth",          authRoutes);
app.use("/api/events",        eventsRoutes);
app.use("/api/faqs",          faqsRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/gallery",       galleryRoutes);
app.use("/api/contact",       contactRoutes);

/* ── 404 handler ─────────────────────────────────────── */
app.use((_req, res) =>
  res.status(404).json({ success: false, message: "Route not found." })
);

/* ── Central error handler (must be last) ────────────── */
app.use(errorHandler);

/* ── Start server ────────────────────────────────────── */
const PORT = parseInt(process.env.PORT, 10) || 5000;
app.listen(PORT, () => {
  console.log(`\n🛕  Holeshwar Mahadev Temple API`);
  console.log(`🚀  Server running on http://localhost:${PORT}`);
  console.log(`🌿  Environment: ${process.env.NODE_ENV || "development"}\n`);
});

module.exports = app;
