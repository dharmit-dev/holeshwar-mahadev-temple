const jwt   = require("jsonwebtoken");
const Admin = require("../models/Admin");

/**
 * Protect middleware — verifies Bearer JWT from Authorization header.
 * On success, attaches `req.admin` and calls next().
 * On failure, returns 401 — the frontend Axios interceptor handles redirect.
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authenticated." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin account not found." });
    }

    req.admin = admin;
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Session expired. Please log in again."
        : "Invalid token.";
    return res.status(401).json({ success: false, message });
  }
};

module.exports = { protect };
