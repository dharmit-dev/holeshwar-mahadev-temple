import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExpand } from "react-icons/fa";

// ALL 12 JYOTIRLING IMAGES
import somnath from "../assets/images/01-somnath.jpg";
import rameshwaram from "../assets/images/02-rameshwaram.jpg";
import mahakaleshwar from "../assets/images/03-mahakaleshwar.jpg";
import kashi from "../assets/images/04-kashi-vishwanath.jpg";
import bhimashankar from "../assets/images/05-bhimashankar.jpg";
import trimbakeshwar from "../assets/images/06-trimbakeshwar.jpg";
import nageshwar from "../assets/images/07-nageshwar.jpg";
import vaidyanath from "../assets/images/08-vaidyanath.jpg";
import grishneshwar from "../assets/images/09-grishneshwar.jpg";
import kedarnath from "../assets/images/10-kedarnath.jpg";
import mallikarjuna from "../assets/images/11-mallikarjuna.jpg";
import omkareshwar from "../assets/images/12-omkareshwar.jpg";

const jyotirlings = [
  {
    name: "Somnath Jyotirling",
    image: somnath,
    location: "Gujarat",
  },
  {
    name: "Mallikarjuna Jyotirling",
    image: mallikarjuna,
    location: "Andhra Pradesh",
  },
  {
    name: "Mahakaleshwar Jyotirling",
    image: mahakaleshwar,
    location: "Madhya Pradesh",
  },
  {
    name: "Omkareshwar Jyotirling",
    image: omkareshwar,
    location: "Madhya Pradesh",
  },
  {
    name: "Kedarnath Jyotirling",
    image: kedarnath,
    location: "Uttarakhand",
  },
  {
    name: "Bhimashankar Jyotirling",
    image: bhimashankar,
    location: "Maharashtra",
  },
  {
    name: "Kashi Vishwanath Jyotirling",
    image: kashi,
    location: "Uttar Pradesh",
  },
  {
    name: "Trimbakeshwar Jyotirling",
    image: trimbakeshwar,
    location: "Maharashtra",
  },
  {
    name: "Vaidyanath Jyotirling",
    image: vaidyanath,
    location: "Jharkhand",
  },
  {
    name: "Nageshwar Jyotirling",
    image: nageshwar,
    location: "Gujarat",
  },
  {
    name: "Rameshwaram Jyotirling",
    image: rameshwaram,
    location: "Tamil Nadu",
  },
  {
    name: "Grishneshwar Jyotirling",
    image: grishneshwar,
    location: "Maharashtra",
  },
];

function JyotirlingsSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADING */}
        <div className="text-center mb-14">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm font-semibold">
            Sacred Jyotirlings
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Divine Jyotirling Inspirations
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto text-lg">
            Explore all 12 sacred Jyotirlingas of Lord Shiva.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {jyotirlings.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-orange-100"
            >
              <div
                className="relative cursor-pointer group"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[300px] object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition duration-500" />

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                  <FaExpand />
                </div>
              </div>

              <div className="p-6 text-center">
                <div className="text-orange-500 text-3xl mb-3">ॐ</div>

                <h3 className="text-lg font-bold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {item.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
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
                src={selectedImage.image}
                alt={selectedImage.name}
                className="w-full max-h-[85vh] object-contain rounded-3xl"
              />

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center"
              >
                <FaTimes />
              </button>

              <div className="text-center mt-6">
                <h3 className="text-white text-3xl font-bold">
                  {selectedImage.name}
                </h3>

                <p className="text-orange-300 mt-2 text-lg">
                  {selectedImage.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default JyotirlingsSection;