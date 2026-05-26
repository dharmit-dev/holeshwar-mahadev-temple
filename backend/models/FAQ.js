const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    q:      { type: String, required: true, trim: true },
    a:      { type: String, required: true, trim: true },
    order:  { type: Number, default: 0 },     // admin can drag-reorder later
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

faqSchema.index({ order: 1 });

module.exports = mongoose.model("FAQ", faqSchema);
