const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role:     { type: String, default: "admin" },
  },
  { timestamps: true }
);

/* Hash password before save */
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/* Instance method: compare plain text against hash */
adminSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

/* Never send password field in JSON responses */
adminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("Admin", adminSchema);
