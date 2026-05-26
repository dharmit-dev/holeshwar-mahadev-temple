import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Clock,
  Camera,
  MapPin,
  Shirt,
  Car,
  BellRing,
} from "lucide-react";

import img21 from "../assets/images/21.png";
import { getFAQs } from "../services/templeService";

const iconMap = [
  <Clock size={20} />,
  <BellRing size={20} />,
  <MapPin size={20} />,
  <Camera size={20} />,
  <Shirt size={20} />,
  <Car size={20} />,
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const data = await getFAQs();
        setFaqData(data);
      } catch (error) {
        console.error("FAQ load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f2e8]">
        <div className="text-2xl font-semibold text-orange-600">
          Loading FAQs...
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
              <HelpCircle size={18} />
              Frequently Asked Questions
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Temple Questions &
              <span className="block text-orange-500">
                Devotee Information
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Find quick answers about darshan timings, temple visits, aarti
              schedules, photography, facilities, and spiritual guidelines.
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={img21}
              alt="Temple FAQ"
              className="rounded-3xl h-[500px] w-full object-cover shadow-[0_20px_70px_rgba(255,140,0,0.18)] border border-orange-100"
            />
          </motion.div>
        </div>
      </section>
            {/* FAQ SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-6">
          {faqData.length === 0 ? (
            <div className="text-center text-gray-500 text-xl">
              No FAQs available
            </div>
          ) : (
            faqData.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={faq.id}
                  layout
                  className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between gap-5 p-6 md:p-8 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0">
                        {iconMap[index % iconMap.length]}
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-gray-900">
                        {faq.q}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-orange-500 flex-shrink-0"
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 pl-22">
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Still Have Questions?
          </h2>

          <p className="mt-6 text-lg text-orange-50 max-w-3xl mx-auto">
            Reach out to Holeshwar Mahadev Temple for darshan guidance,
            spiritual enquiries, and temple visit assistance.
          </p>
        </div>
      </section>
    </div>
  );
}