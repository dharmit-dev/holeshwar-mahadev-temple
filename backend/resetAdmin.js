require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  await Admin.deleteMany({});

  await Admin.create({
    name: "Temple Admin",
    email: "admin@holeshwarmahadev.org",
    password: "Admin@1234",
  });

  console.log("NEW ADMIN CREATED");
  process.exit();
}

run();