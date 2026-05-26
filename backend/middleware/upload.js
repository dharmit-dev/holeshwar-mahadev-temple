const multer = require("multer");
const path   = require("path");
const fs     = require("fs");

const UPLOAD_DIR = path.join(__dirname, "..", process.env.UPLOAD_DIR || "uploads", "gallery");

/* Ensure directory exists on startup */
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename:    (_req, file, cb) => {
    const ext      = path.extname(file.originalname).toLowerCase();
    const safeName = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const unique   = `${Date.now()}_${safeName}${ext}`;
    cb(null, unique);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const ext     = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, png, webp, gif) are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: (parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 5) * 1024 * 1024,
  },
});

module.exports = { upload, UPLOAD_DIR };
