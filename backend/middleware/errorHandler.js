/**
 * Central error handler — must be the LAST middleware registered in server.js.
 * All errors thrown or passed to next(err) land here.
 */
const errorHandler = (err, req, res, _next) => {
  console.error(`[${new Date().toISOString()}] ${err.message}`);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join("; ") });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ success: false, message: `${field} already exists.` });
  }

  // Mongoose cast error (bad ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid ID format." });
  }

  // Multer file too large
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      success: false,
      message: `File too large. Max size is ${process.env.MAX_FILE_SIZE_MB || 5} MB.`,
    });
  }

  // Default
  const status  = err.statusCode || err.status || 500;
  const message = err.message    || "Internal server error.";
  res.status(status).json({ success: false, message });
};

module.exports = errorHandler;
