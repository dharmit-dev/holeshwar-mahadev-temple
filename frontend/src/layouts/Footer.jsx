import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaOm,
} from "react-icons/fa";

import {
  TEMPLE_NAME,
  TEMPLE_ADDRESS,
  TEMPLE_PHONE,
  QUICK_LINKS,
} from "../utils/constants";

const SOCIALS = [
  {
    Icon: FaInstagram,
    href: "https://www.instagram.com/holeshwar_mahadev_ranavav/",
  },
  {
    Icon: FaWhatsapp,
    href: "#", // replace later with whatsapp link
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const templeEmail = "info@holeshwarmahadev.com";

  return (
    <footer className="bg-stone-900 text-stone-200">
      <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-5">
            <div className="h-11 w-11 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
              <FaOm className="text-white text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{TEMPLE_NAME}</h2>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-400">
                Temple Portal
              </p>
            </div>
          </Link>

          <p className="text-sm text-stone-400 leading-relaxed">
            A sacred place for peace, devotion, and spiritual connection.
            Welcome to all devotees and visitors.
          </p>

          <div className="flex gap-3 mt-5">
            {SOCIALS.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-stone-800 hover:bg-orange-500 transition flex items-center justify-center"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-stone-400 hover:text-orange-400 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-5">
            Contact
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <FaMapMarkerAlt className="text-orange-400 mt-1" />
              <span className="text-sm text-stone-400">{TEMPLE_ADDRESS}</span>
            </div>

            <div className="flex gap-3">
              <FaPhone className="text-orange-400 mt-1" />
              <a
                href={`tel:${TEMPLE_PHONE}`}
                className="text-sm text-stone-400 hover:text-orange-400"
              >
                {TEMPLE_PHONE}
              </a>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="text-orange-400 mt-1" />
              <a
                href={`mailto:${templeEmail}`}
                className="text-sm text-stone-400 hover:text-orange-400"
              >
                {templeEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Timings */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-5">
            Darshan Timings
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-stone-800 pb-2">
              <span className="text-stone-400">Morning</span>
              <span className="text-white">6:00 AM - 12:00 PM</span>
            </div>

            <div className="flex justify-between border-b border-stone-800 pb-2">
              <span className="text-stone-400">Evening</span>
              <span className="text-white">4:00 PM - 9:00 PM</span>
            </div>

            <div className="flex justify-between border-b border-stone-800 pb-2">
              <span className="text-stone-400">Morning Aarti</span>
              <span className="text-white">7:00 AM</span>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-400">Evening Aarti</span>
              <span className="text-white">7:30 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-stone-500">
          <span>© {year} {TEMPLE_NAME}. All rights reserved.</span>
          <span>Built with devotion 🙏</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;