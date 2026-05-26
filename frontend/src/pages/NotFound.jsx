import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Compass, AlertTriangle } from "lucide-react";

import img14 from "../assets/images/14.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f2e8] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-20" />

      {/* Om */}
      <div className="absolute top-10 left-10 text-orange-200 text-8xl opacity-20">
        ॐ
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <div className="bg-white rounded-3xl p-4 shadow-[0_20px_70px_rgba(255,140,0,0.15)] border border-orange-100">
            <img
              src={img14}
              alt="Page Not Found"
              className="rounded-2xl h-[480px] w-full object-cover"
            />
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6 shadow-md">
            <AlertTriangle size={18} />
            Sacred Path Lost
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-orange-500 leading-none">
            404
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-5 leading-tight">
            This Spiritual Path
            <span className="block text-orange-500">
              Could Not Be Found
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
            It seems the page you're looking for has wandered away from the
            sacred temple path. Return to Holeshwar Mahadev and continue your
            divine journey.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <Home size={20} />
              Back to Home
            </Link>

            <Link
              to="/gallery"
              className="border border-orange-400 text-orange-600 hover:bg-orange-100 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3"
            >
              <Compass size={20} />
              Explore Gallery
            </Link>
          </div>

          {/* Quote */}
          <div className="mt-10 bg-white rounded-3xl shadow-xl border border-orange-100 p-6">
            <p className="text-stone-700 text-lg leading-relaxed italic">
              "Om Namah Shivaya — Even when paths are lost, divine guidance
              always leads us home."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}