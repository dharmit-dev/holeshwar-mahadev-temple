import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Heart,
} from "lucide-react";

import { submitContact } from "../services/templeService";
import img10 from "../assets/images/10.png";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await submitContact(form);

      alert("🙏 Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      alert(
        err?.response?.data?.message || "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  };

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
              <MapPin size={18} />
              Contact Holeshwar Mahadev
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Visit Our Sacred
              <span className="block text-orange-500">
                Temple Destination
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Reach out for darshan enquiries, spiritual guidance, temple visit
              information, or connect with Holeshwar Mahadev Temple for divine
              blessings.
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={img10}
              alt="Temple Contact"
              className="rounded-3xl h-[500px] w-full object-cover shadow-[0_20px_70px_rgba(255,140,0,0.18)] border border-orange-100"
            />
          </motion.div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <MapPin size={28} />,
              title: "Temple Address",
              desc: "Ranavav, Porbandar, Gujarat",
            },
            {
              icon: <Phone size={28} />,
              title: "Phone",
              desc: "+91 9876543210",
            },
            {
              icon: <Mail size={28} />,
              title: "Email",
              desc: "info@holeshwarmahadev.com",
            },
            {
              icon: <Clock size={28} />,
              title: "Darshan Hours",
              desc: "5:30 AM – 12 PM | 4 PM – 8 PM",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM + INFO */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 shadow-xl border border-orange-100"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Send an Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-5 py-4 rounded-2xl border border-orange-200 outline-none focus:border-orange-500"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-5 py-4 rounded-2xl border border-orange-200 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-5 py-4 rounded-2xl border border-orange-200 outline-none focus:border-orange-500"
              />

              <textarea
                rows="6"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full px-5 py-4 rounded-2xl border border-orange-200 outline-none focus:border-orange-500 resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
              >
                <Send size={20} />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-orange-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Visit the Temple
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                Holeshwar Mahadev Temple welcomes all devotees seeking peace,
                blessings, spiritual guidance, and divine darshan.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <Heart className="text-orange-500 mt-1" size={20} />
                  <p className="text-gray-700">
                    Kindly maintain silence inside temple premises.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <Heart className="text-orange-500 mt-1" size={20} />
                  <p className="text-gray-700">
                    Remove footwear before entering sacred areas.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <Heart className="text-orange-500 mt-1" size={20} />
                  <p className="text-gray-700">
                    Respect darshan queue discipline.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-xl border border-orange-100 overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Holeshwar%20Mahadev%20Temple%20Ranavav&output=embed"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                title="Temple Location"
                className="rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}