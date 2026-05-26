import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaOm, FaBullhorn } from "react-icons/fa";
import { NAV_LINKS, TEMPLE_NAME } from "../utils/constants";
import { getAnnouncements } from "../services/templeService";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data || []);
      } catch (error) {
        console.error("Failed to load announcements:", error);
      }
    };

    loadAnnouncements();
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative font-medium text-sm transition-colors duration-200 py-1 ${
      isActive
        ? "text-orange-500"
        : "text-stone-700 hover:text-orange-500"
    }`;

  return (
    <>
      {/* LIVE ANNOUNCEMENT TICKER */}
      {announcements.length > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white overflow-hidden relative z-50">
          <div className="flex items-center h-12 px-6">
            <div className="flex items-center gap-2 font-semibold whitespace-nowrap mr-8 shrink-0">
              <FaBullhorn />
              Announcements
            </div>

            <div className="flex-1 overflow-hidden relative h-full">
              <motion.div
                className="absolute whitespace-nowrap flex items-center h-full"
                animate={{ x: ["100%", "-100%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                }}
              >
                {[...announcements, ...announcements].map((item, index) => (
                  <span
                    key={index}
                    className="mx-10 text-sm md:text-base font-medium"
                  >
                    🔱 {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-orange-50/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                <FaOm className="text-white text-xl" />
              </div>

              <div>
                <span className="text-xl font-bold text-stone-900 block">
                  {TEMPLE_NAME}
                </span>

                <span className="text-[10px] uppercase tracking-[0.25em] text-orange-500">
                  Temple Portal
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={navLinkClass}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ADMIN BUTTON */}
            <Link
              to="/admin/login"
              className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition"
            >
              Admin
            </Link>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden text-2xl text-stone-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <nav className="flex flex-col px-6 py-4 gap-3">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-stone-700 hover:text-orange-500 font-medium block w-full"
                  >
                    {link.label}
                  </NavLink>
                ))}

                <Link
                  to="/admin/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 bg-orange-500 text-white px-4 py-3 rounded-xl text-center font-medium"
                >
                  Admin Login
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;