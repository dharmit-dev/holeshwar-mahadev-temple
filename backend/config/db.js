const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌  MONGODB_URI is not set in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      // Mongoose 8 has sensible defaults; these silence deprecation warnings 
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌  MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

// Log future disconnects
mongoose.connection.on("disconnected", () =>
  console.warn("⚠️   MongoDB disconnected")
);
mongoose.connection.on("reconnected", () =>
  console.log("✅  MongoDB reconnected")
);

module.exports = connectDB;
