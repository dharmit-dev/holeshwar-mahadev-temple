const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    title:    { type: String, required: true, trim: true },
    category: {
      type:    String,
      required: true,
      enum:    ["Festivals", "Daily Aarti", "Architecture", "Prasad", "Nature", "Other"],
      default: "Other",
    },
    // Relative path served by Express static: /uploads/gallery/<filename>
    filename: { type: String, required: true },
    // Full public URL built at response time — stored for convenience
    src:      { type: String, required: true },
    order:    { type: Number, default: 0 },
    active:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

galleryImageSchema.index({ active: 1, category: 1, order: 1 });

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
