const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, lowercase: true, trim: true },
    phone:   { type: String, default: "", trim: true },
    subject: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },
    read:    { type: Boolean, default: false },   // admin can mark as read
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactSchema.index({ read: 1, createdAt: -1 });

module.exports = mongoose.model("ContactMessage", contactSchema);
