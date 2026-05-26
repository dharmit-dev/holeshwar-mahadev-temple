import { motion } from "framer-motion";
import {
  Clock,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  BellRing,
  HeartHandshake,
} from "lucide-react";

import shivling from "../assets/images/shivling.jpg";

const openHours = [
  {
    title: "Morning Darshan",
    time: "5:30 AM – 12:00 PM",
    icon: <Sun size={28} />,
  },
  {
    title: "Evening Darshan",
    time: "4:00 PM – 8:00 PM",
    icon: <Moon size={28} />,
  },
];

const seasonalAarti = [
  {
    season: "Summer Aarti",
    timings: [
      { label: "Morning Aarti", time: "6:00 AM" },
      { label: "Evening Aarti", time: "7:00 PM" },
    ],
  },
  {
    season: "Winter Aarti",
    timings: [
      { label: "Morning Aarti", time: "6:00 AM" },
      { label: "Evening Aarti", time: "6:00 PM" },
    ],
  },
];

const specialFestival = [
  { label: "Morning Aarti", time: "6:00 AM" },
  { label: "Evening Aarti", time: "6:00 PM" },
  { label: "Maha Aarti", time: "12:00 AM" },
];

const devoteeGuidelines = [
  {
    icon: <ShieldCheck size={26} />,
    title: "Maintain Silence",
    desc: "Respect the peaceful spiritual environment of the temple premises.",
  },
  {
    icon: <HeartHandshake size={26} />,
    title: "Remove Footwear",
    desc: "Kindly remove footwear before entering the temple premises.",
  },
  {
    icon: <BellRing size={26} />,
    title: "Queue Discipline",
    desc: "Follow proper darshan queue discipline during crowded hours.",
  },
  {
    icon: <Sparkles size={26} />,
    title: "Sacred Cleanliness",
    desc: "Help maintain cleanliness and preserve the sanctity of the temple.",
  },
];

export default function Darshan() {
  return (
    <div className="min-h-screen bg-[#f8f2e8]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f2e8] via-[#fff7eb] to-[#f5ead8] py-28 px-6">
        <div className="absolute top-10 left-10 text-orange-200 text-8xl opacity-20">
          ॐ
        </div>

        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6 shadow-md">
              <Clock size={18} />
              Temple Darshan & Aarti Timings
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Sacred Darshan
              <span className="block text-orange-500">
                Timings & Aarti Schedule
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Plan your divine visit to Holeshwar Mahadev Temple with complete
              darshan timings, seasonal aarti schedules, and special festival
              spiritual celebrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={shivling}
              alt="Holeshwar Mahadev Shivling"
              className="rounded-3xl h-[450px] w-full object-cover shadow-[0_20px_70px_rgba(255,140,0,0.18)] border border-orange-100"
            />
          </motion.div>
        </div>
      </section>

      {/* Darshan Timings */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Regular Darshan Timings</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {openHours.map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100 flex items-center gap-6 hover:shadow-md transition-shadow"
            >
              <div className="text-orange-500 bg-orange-50 p-4 rounded-xl">
                {session.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{session.title}</h3>
                <p className="text-orange-600 font-medium text-lg">{session.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Aarti Schedule */}
      <section className="py-20 px-6 bg-white border-y border-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Aarti Schedule</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience the divine atmosphere during our daily Aarti ceremonies.
              Timings vary slightly between seasons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16">
            {seasonalAarti.map((seasonData, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-orange-50/50 rounded-3xl p-8 border border-orange-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{seasonData.season}</h3>
                <div className="space-y-4">
                  {seasonData.timings.map((aarti, aIndex) => (
                    <div key={aIndex} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm">
                      <span className="font-semibold text-gray-700 flex items-center gap-2">
                        <BellRing size={18} className="text-orange-400" />
                        {aarti.label}
                      </span>
                      <span className="text-orange-600 font-bold">{aarti.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Special Festivals */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-orange-100 text-orange-600 rounded-full mb-6">
              <Sparkles size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Special Festivals Schedule</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {specialFestival.map((aarti, index) => (
                <div key={index} className="bg-white border border-orange-200 px-6 py-3 rounded-full shadow-sm flex items-center gap-3">
                  <span className="font-medium text-gray-700">{aarti.label}</span>
                  <span className="text-orange-500 font-bold">{aarti.time}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6">
              * Applicable during Mahashivratri, Shravan Maas, and Sawan.
            </p>
          </div>
        </div>
      </section>

      {/* Devotee Guidelines */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Temple Guidelines</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {devoteeGuidelines.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-50 text-orange-500 mb-4">
                {guide.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{guide.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}