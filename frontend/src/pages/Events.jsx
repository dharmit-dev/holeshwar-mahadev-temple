import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Sparkles,
  Flame,
  BellRing,
  Star,
  HeartHandshake,
} from "lucide-react";

import img3 from "../assets/images/3.png";
import img18 from "../assets/images/18.png";
import img20 from "../assets/images/20.png";

import { getEvents, getAnnouncements } from "../services/templeService";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEventsData = async () => {
      try {
        const [eventsData, announcementsData] = await Promise.all([
          getEvents(),
          getAnnouncements(),
        ]);

        setEvents(eventsData);
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error("Events page load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEventsData();
  }, []);

  const regularPoojas = [
    {
      title: "Morning Aarti",
      time: "6:00 AM",
    },
    {
      title: "Evening Aarti",
      time: "Seasonal Timing",
    },
    {
      title: "Special Maha Aarti",
      time: "Festival Nights",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f2e8]">
        <div className="text-2xl font-semibold text-orange-600">
          Loading events...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f2e8]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f2e8] via-[#fff7eb] to-[#f5ead8] py-28 px-6">
        <div className="absolute top-10 left-10 text-orange-200 text-8xl opacity-20">
          ॐ
        </div>

        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6 shadow-md">
              <CalendarDays size={18} />
              Temple Festivals & Events
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Sacred Events &
              <span className="block text-orange-500">
                Spiritual Celebrations
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Experience divine celebrations, sacred festivals, temple poojas,
              and spiritual gatherings at Holeshwar Mahadev Temple.
            </p>
          </motion.div>

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={img3}
              alt="Temple Events"
              className="rounded-3xl h-[450px] w-full object-cover shadow-[0_20px_70px_rgba(255,140,0,0.18)] border border-orange-100"
            />
          </motion.div>
        </div>
      </section>
            {/* DYNAMIC EVENTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Major Spiritual Celebrations
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Sacred temple festivals and divine gatherings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500">
              No events available
            </p>
          ) : (
            events.slice(0, 6).map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
                  <Flame size={26} />
                </div>

                <p className="text-orange-500 font-semibold mb-3">
                  {event.category}
                </p>

                <h3 className="text-2xl font-bold text-gray-900">
                  {event.title}
                </h3>

                <p className="text-gray-600 mt-5 leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* FEATURE EVENT */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden"
          >
            <img
              src={img18}
              alt="Featured Event"
              className="h-full min-h-[400px] w-full object-cover"
            />

            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-orange-500 uppercase tracking-[0.25em] text-sm font-semibold mb-4">
                Festival Highlight
              </p>

              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                {events[0].title}
              </h2>

              <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                {events[0].description}
              </p>

              <div className="mt-8 bg-orange-50 rounded-2xl p-5">
                <p className="text-orange-600 font-bold text-lg">
                  Date:{" "}
                  {new Date(events[0].date).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* REGULAR POOJAS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Regular Temple Poojas
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {regularPoojas.map((pooja, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 mb-5">
                <Star size={24} />
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {pooja.title}
              </h3>

              <p className="text-orange-500 font-semibold text-lg mt-4">
                {pooja.time}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DYNAMIC ANNOUNCEMENTS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src={img20}
            alt="Temple Updates"
            className="rounded-3xl h-[420px] w-full object-cover shadow-xl"
          />

          <div>
            <p className="text-orange-500 uppercase tracking-[0.25em] text-sm font-semibold mb-4">
              Temple Announcements
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Important Spiritual Updates
            </h2>

            <div className="mt-8 space-y-4">
              {announcements.length === 0 ? (
                <p className="text-gray-500">No announcements available</p>
              ) : (
                announcements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-md border border-orange-100"
                  >
                    <HeartHandshake
                      className="text-orange-500 mt-1"
                      size={20}
                    />
                    <p className="text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Join Our Sacred Spiritual Celebrations
          </h2>

          <p className="mt-6 text-lg text-orange-50 max-w-3xl mx-auto">
            Experience divine blessings, spiritual peace, and timeless devotion
            at Holeshwar Mahadev Temple.
          </p>
        </div>
      </section>
    </div>
  );
}