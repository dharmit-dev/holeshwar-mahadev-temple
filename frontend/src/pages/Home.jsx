import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaCalendarAlt,
  FaImages,
  FaMapMarkerAlt,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import { GiTriquetra, GiLotus } from "react-icons/gi";

import templeHero from "../assets/images/temple-hero.jpg";

import { getEvents, getGallery } from "../services/templeService";

const DARSHAN_TIMINGS = [
  { session: "Morning Darshan", time: "5:30 AM – 12:00 PM" },
  { session: "Evening Darshan", time: "4:00 PM – 9:30 PM" },
  { session: "Aarti Timing", time: "7:00 AM & 7:00 PM" },
  { session: "Special Pooja", time: "Monday Rudrabhishek" },
];

function Home() {
  const [lightbox, setLightbox] = useState(null);
  const [events, setEvents] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [eventsData, galleryData] = await Promise.all([
          getEvents(),
          getGallery("All"),
        ]);

        setEvents(eventsData.slice(0, 3));
        setGalleryImages(galleryData.slice(0, 4));
      } catch (error) {
        console.error("Home data load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-2xl font-semibold text-orange-600">
          Loading temple data...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src={templeHero}
          alt="Holeshwar Mahadev Temple"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-orange-200 text-sm mb-6 backdrop-blur-sm">
                <GiTriquetra />
                Jai Mahadev • Ranavav, Gujarat
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Holeshwar
                <span className="block text-orange-400">Mahadev</span>
              </h1>

              <p className="text-white/80 text-lg mt-6 max-w-xl leading-relaxed">
                Experience divine peace, devotion, sacred darshan, and spiritual
                celebrations at Holeshwar Mahadev Temple.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/timings"
                  className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl text-white font-semibold shadow-xl transition"
                >
                  Darshan Timings
                </Link>

                <Link
                  to="/gallery"
                  className="border border-white/30 hover:bg-white/10 px-8 py-4 rounded-2xl text-white font-semibold transition"
                >
                  Explore Gallery
                </Link>
              </div>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl">
                    <GiLotus />
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-xl">
                      Holeshwar Mahadev
                    </h3>
                    <p className="text-orange-200 text-sm">
                      Porbandar, Gujarat
                    </p>
                  </div>
                </div>

                {DARSHAN_TIMINGS.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-3 border-b border-white/10"
                  >
                    <span className="text-white/70">{item.session}</span>
                    <span className="text-orange-300 font-semibold">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="-mt-12 relative z-20 max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaClock />,
              title: "Morning Darshan",
              desc: "5:30 AM – 12:00 PM",
            },
            {
              icon: <FaClock />,
              title: "Evening Darshan",
              desc: "4:00 PM – 9:30 PM",
            },
            {
              icon: <FaCalendarAlt />,
              title: "Upcoming Events",
              desc: events.length > 0 ? events[0].title : "No events",
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Temple Location",
              desc: "Ranavav, Porbandar",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-xl p-6 border border-orange-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-2xl mb-4">
                {item.icon}
              </div>

              <h3 className="font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
            {/* EVENTS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Upcoming Events
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {events.length === 0 ? (
              <p className="col-span-3 text-center text-gray-500">
                No events available
              </p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100"
                >
                  <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex flex-col items-center justify-center mb-6">
                    <span className="text-sm font-bold">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white">
            Temple Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-14 auto-rows-[220px]">
            {galleryImages.length === 0 ? (
              <p className="col-span-3 text-center text-white/70">
                No gallery images available
              </p>
            ) : (
              galleryImages.map((img, i) => (
                <div
                  key={img.id}
                  onClick={() => setLightbox(img)}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer group ${
                    i === 0 ? "row-span-2" : ""
                  } ${i === 3 ? "md:col-span-2" : ""}`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                    <div>
                      <p className="text-white font-bold">{img.title}</p>
                      <span className="text-orange-300 text-sm">
                        {img.category}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <FaExpand />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl text-white font-semibold"
            >
              <FaImages />
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full max-h-[85vh] object-contain rounded-3xl"
              />

              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;