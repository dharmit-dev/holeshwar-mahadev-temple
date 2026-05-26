import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera } from "lucide-react";
import { FaOm } from "react-icons/fa";
import { getGallery } from "../services/templeService";

/* STATIC TEMPLE IMAGES */
import img1 from "../assets/images/1.png";
import img2 from "../assets/images/2.png";
import img3 from "../assets/images/3.png";
import img4 from "../assets/images/4.png";
import img5 from "../assets/images/5.png";
import img6 from "../assets/images/6.png";
import img7 from "../assets/images/7.png";
import img8 from "../assets/images/8.png";
import img9 from "../assets/images/9.png";
import img10 from "../assets/images/10.png";
import img11 from "../assets/images/11.png";
import img12 from "../assets/images/12.png";
import img13 from "../assets/images/13.png";
import img14 from "../assets/images/14.png";
import img15 from "../assets/images/15.png";
import img16 from "../assets/images/16.png";
import img17 from "../assets/images/17.png";
import img18 from "../assets/images/18.png";
import img19 from "../assets/images/19.png";
import img20 from "../assets/images/20.png";
import img21 from "../assets/images/21.png";
import img22 from "../assets/images/22.png";
import img23 from "../assets/images/23.png";
import img24 from "../assets/images/24.jpg";
import img25 from "../assets/images/25.jpg";
import img26 from "../assets/images/26.jpg";
import img27 from "../assets/images/27.jpg";
import img28 from "../assets/images/28.jpg";
import img29 from "../assets/images/29.jpg";
import img30 from "../assets/images/30.jpg";

import shivling from "../assets/images/shivling.jpg";
import shivStatue from "../assets/images/shiv-statue.jpg";
import templeHero from "../assets/images/temple-hero.jpg";

/* JYOTIRLING */
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

const staticTempleImages = [
  { src: templeHero, title: "Temple Majesty", category: "Temple" },
  { src: shivStatue, title: "Divine Shiva Presence", category: "Shiva Darshan" },
  { src: shivling, title: "Sacred Shivling", category: "Shiva Darshan" },

  { src: img1, title: "Temple Entrance", category: "Temple" },
  { src: img2, title: "Blue Sky Temple", category: "Temple" },
  { src: img3, title: "Cloud Temple", category: "Temple" },
  { src: img4, title: "Architecture Beauty", category: "Temple" },
  { src: img5, title: "Temple View", category: "Temple" },
  { src: img6, title: "Temple Peace", category: "Temple" },
  { src: img7, title: "Temple Tower", category: "Temple" },
  { src: img8, title: "Temple Courtyard", category: "Temple" },
  { src: img9, title: "Sacred Grounds", category: "Temple" },
  { src: img10, title: "Temple Front", category: "Temple" },

  { src: img11, title: "Nature Temple", category: "Nature" },
  { src: img12, title: "Temple Side", category: "Temple" },
  { src: img13, title: "Entrance View", category: "Temple" },
  { src: img14, title: "Nature Blessings", category: "Nature" },
  { src: img15, title: "Tree Temple", category: "Nature" },

  { src: img16, title: "Sacred Courtyard", category: "Shiva Darshan" },
  { src: img17, title: "Shiva Murti", category: "Shiva Darshan" },

  { src: img18, title: "Temple Panorama", category: "Temple" },
  { src: img19, title: "Temple Sacred", category: "Temple" },
  { src: img20, title: "Temple Architecture", category: "Temple" },
  { src: img21, title: "Temple Detail", category: "Temple" },
  { src: img22, title: "Temple Interior", category: "Temple" },
  { src: img23, title: "Evening Divine", category: "Temple" },

  { src: img24, title: "Temple Sky", category: "Temple" },
  { src: img25, title: "Temple Flag", category: "Festivals" },
  { src: img26, title: "Temple Height", category: "Temple" },
  { src: img27, title: "Temple Festival", category: "Festivals" },
  { src: img28, title: "Temple Celebration", category: "Festivals" },
  { src: img29, title: "Sacred Nature", category: "Nature" },
  { src: img30, title: "Nature Serenity", category: "Nature" },
];

const jyotirlingImages = [
  { src: somnath, title: "Somnath Jyotirling", category: "Jyotirling" },
  { src: rameshwaram, title: "Rameshwaram Jyotirling", category: "Jyotirling" },
  { src: mahakaleshwar, title: "Mahakaleshwar Jyotirling", category: "Jyotirling" },
  { src: kashi, title: "Kashi Vishwanath Jyotirling", category: "Jyotirling" },
  { src: bhimashankar, title: "Bhimashankar Jyotirling", category: "Jyotirling" },
  { src: trimbakeshwar, title: "Trimbakeshwar Jyotirling", category: "Jyotirling" },
  { src: nageshwar, title: "Nageshwar Jyotirling", category: "Jyotirling" },
  { src: vaidyanath, title: "Vaidyanath Jyotirling", category: "Jyotirling" },
  { src: grishneshwar, title: "Grishneshwar Jyotirling", category: "Jyotirling" },
  { src: kedarnath, title: "Kedarnath Jyotirling", category: "Jyotirling" },
  { src: mallikarjuna, title: "Mallikarjuna Jyotirling", category: "Jyotirling" },
  { src: omkareshwar, title: "Omkareshwar Jyotirling", category: "Jyotirling" },
];

const categories = [
  "All",
  "Temple",
  "Shiva Darshan",
  "Nature",
  "Festivals",
  "Jyotirling",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [adminImages, setAdminImages] = useState([]);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await getGallery("All");

        const mapped = data.map((img) => ({
          ...img,
          category:
            img.category === "Daily Aarti" || img.category === "Prasad"
              ? "Shiva Darshan"
              : img.category === "Festivals"
              ? "Festivals"
              : img.category === "Nature"
              ? "Nature"
              : "Temple",
        }));

        setAdminImages(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    loadGallery();
  }, []);

  const allTempleImages = [...staticTempleImages, ...adminImages];

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return allTempleImages;
    if (activeCategory === "Jyotirling") return jyotirlingImages;

    return allTempleImages.filter(
      (img) => img.category === activeCategory
    );
  }, [activeCategory, adminImages]);

    useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f2e8]">
      {/* HERO */}
      <section className="relative py-28 px-6 bg-gradient-to-br from-[#f8f2e8] via-[#fff7eb] to-[#f5ead8]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-100 text-orange-600 font-semibold mb-8">
            <Camera size={18} />
            Divine Temple Gallery
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900">
            Divine Glimpses of
            <span className="block text-orange-500">
              Holeshwar Mahadev
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore sacred temple moments, divine darshan, spiritual festivals,
            and timeless blessings.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-7 py-3 rounded-full font-semibold transition ${
                activeCategory === category
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-stone-700 border border-orange-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id || index}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage(image)}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="p-6 text-center">
                <FaOm className="mx-auto text-orange-500 text-2xl mb-4" />

                <p className="text-sm font-semibold text-orange-500 mb-2">
                  {image.category}
                </p>

                <h3 className="font-bold text-stone-900 text-lg">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white z-50"
            >
              <X size={30} />
            </button>

            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-h-[85vh] max-w-[90vw] rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}