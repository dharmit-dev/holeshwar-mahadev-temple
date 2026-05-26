const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    text:      { type: String, required: true, trim: true },
    active:    { type: Boolean, default: true },
    order:     { type: Number,  default: 0 },
    expiresAt: { type: Date,    default: null },  // null = never expires
  },
  { timestamps: true }
);

announcementSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model("Announcement", announcementSchema);
