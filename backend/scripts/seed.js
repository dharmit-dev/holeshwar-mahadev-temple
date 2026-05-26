/**
 * Seed script — run ONCE to bootstrap the database.
 * Usage: cd backend && npm run seed
 *
 * It will:
 *  1. Create the default admin account
 *  2. Seed Events, FAQs, and Announcements from constants
 *
 * Safe to re-run — uses upsert/findOrCreate patterns.
 */

require("dotenv").config();
const mongoose     = require("mongoose");
const Admin        = require("../models/Admin");
const Event        = require("../models/Event");
const FAQ          = require("../models/FAQ");
const Announcement = require("../models/Announcement");

/* ── Seed data (mirrors src/utils/constants.js) ────── */
const EVENTS = [
  { title: "Mahashivratri Mahotsav",    date: "2025-02-26", endDate: "2025-02-27", category: "Festival", highlight: true,  order: 1, description: "Grand all-night celebration with continuous puja, bhajan, and Rudrabhishek. Special bhasma aarti at midnight. Free prasad for all devotees." },
  { title: "Sawan Maas Special Darshan",date: "2025-07-07", endDate: "2025-08-04", category: "Festival", highlight: true,  order: 2, description: "Throughout the holy month of Sawan, extended darshan hours with special aarti every Monday morning at 4:00 AM." },
  { title: "Rudrabhishek Shibir",        date: "2025-03-15", endDate: null,         category: "Shibir",   highlight: false, order: 3, description: "One-day Rudrabhishek workshop for devotees. Learn the correct procedure and meaning of Rudrabhishek. Registration required." },
  { title: "Ram Navami Celebration",     date: "2025-04-06", endDate: null,         category: "Festival", highlight: false, order: 4, description: "Celebration of Lord Ram's birth anniversary with special puja, katha, and prasad distribution at Holeshwar Mahadev Temple." },
  { title: "Hanuman Jayanti Mahotsav",   date: "2025-04-12", endDate: null,         category: "Festival", highlight: false, order: 5, description: "Sundar Kand path, Hanuman Chalisa recitation, and evening bhajan program. All are welcome." },
  { title: "Gopratishtha Mahotsav",      date: "2025-05-20", endDate: "2025-05-22", category: "Mahotsav", highlight: true,  order: 6, description: "3-day grand mahotsav with cultural programs, bhajan sandhya, and prasad for all. Generous donations invited." },
];

const FAQS = [
  { order: 1, q: "What are the daily darshan timings?",              a: "Morning darshan is from 5:30 AM to 12:00 PM. The temple remains closed from 12 to 4 PM for bhog and rest. Evening darshan resumes from 4:00 PM to 9:30 PM." },
  { order: 2, q: "Is there a dress code for entering the temple?",   a: "Yes. Devotees are requested to wear traditional or modest attire. Men should avoid shorts and sleeveless t-shirts. Women are encouraged to wear sarees, salwar kameez, or traditional dress." },
  { order: 3, q: "How can I book a Rudrabhishek or special puja?",   a: "Special pujas like Rudrabhishek, Laghu Rudra, and Satyanarayan Katha can be booked at the temple office or by calling us. Pre-booking at least 2 days in advance is recommended." },
  { order: 4, q: "Is photography allowed inside the temple?",         a: "Photography is allowed in the outer courtyard and premises. Photography inside the sanctum sanctorum and near the shivling is strictly not permitted out of respect for devotees." },
  { order: 5, q: "Is there parking available near the temple?",       a: "Yes, parking is available adjacent to the temple complex. Two-wheeler and bicycle parking is free. Four-wheeler parking charges may apply during major festivals." },
  { order: 6, q: "How can I donate or contribute to the temple?",     a: "Donations can be made at the donation counter inside the temple, via bank transfer, or through UPI. Please contact the temple office for bank details." },
  { order: 7, q: "What are the special timings during Mahashivratri?",a: "On Mahashivratri, the temple remains open all night. Puja starts at 12:00 AM midnight with Bhasma Aarti. Extended darshan hours are 12:00 AM to 11:00 PM the next day." },
  { order: 8, q: "Is prasad available every day?",                    a: "Yes, prasad is distributed daily after the morning aarti at 6:30 AM and after the evening Sandhya Aarti at 7:30 PM." },
];

const ANNOUNCEMENTS = [
  { order: 1, text: "🔱 Mahashivratri Mahotsav – Grand celebration on Feb 26. Puja starts at 12:00 AM midnight." },
  { order: 2, text: "🪔 Special Rudrabhishek every Monday at 6:00 AM. All devotees welcome." },
  { order: 3, text: "📿 Sawan Somvar special darshan: 4:00 AM – 11:00 PM. Avoid peak hours 8–10 AM." },
  { order: 4, text: "🌸 Prasad distribution after evening aarti at 7:30 PM daily." },
  { order: 5, text: "🔔 Temple Trust invites donations for upcoming Gopratishtha Mahotsav." },
  { order: 6, text: "🛕 Free Bhasma Aarti darshan registration open – limited slots available." },
];

/* ── Seed function ───────────────────────────────────── */
const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅  Connected to MongoDB");

  /* 1. Admin */
  const existing = await Admin.findOne({ email: "admin@holeshwarmahadev.org" });
  if (!existing) {
    await Admin.create({
      name:     "Temple Admin",
      email:    "admin@holeshwarmahadev.org",
      password: "Admin@1234",      // will be hashed by pre-save hook
    });
    console.log("👤  Admin created → admin@holeshwarmahadev.org / Admin@1234");
  } else {
    console.log("👤  Admin already exists — skipped");
  }

  /* 2. Events */
  await Event.deleteMany({});
  await Event.insertMany(EVENTS.map((e) => ({ ...e, active: true })));
  console.log(`📅  Seeded ${EVENTS.length} events`);

  /* 3. FAQs */
  await FAQ.deleteMany({});
  await FAQ.insertMany(FAQS.map((f) => ({ ...f, active: true })));
  console.log(`❓  Seeded ${FAQS.length} FAQs`);

  /* 4. Announcements */
  await Announcement.deleteMany({});
  await Announcement.insertMany(ANNOUNCEMENTS.map((a) => ({ ...a, active: true })));
  console.log(`📢  Seeded ${ANNOUNCEMENTS.length} announcements`);

  console.log("\n🎉  Database seeded successfully!\n");
  process.exit(0);
};

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
