const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    date:        { type: Date,   required: true },
    endDate:     { type: Date,   default: null },
    category:    {
      type:    String,
      required: true,
      enum:    ["Festival", "Shibir", "Mahotsav", "Satsang", "Other"],
      default: "Festival",
    },
    description: { type: String, required: true, trim: true },
    highlight:   { type: Boolean, default: false },
    active:      { type: Boolean, default: true },
    order:       { type: Number,  default: 0 },
  },
  { timestamps: true }
);

/* Default sort: upcoming first, then by order */
eventSchema.index({ date: 1, order: 1 });

module.exports = mongoose.model("Event", eventSchema);
