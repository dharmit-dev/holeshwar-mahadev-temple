import { motion } from "framer-motion";
import { GiTriquetra, GiLotus, GiPrayer } from "react-icons/gi";
import { FaOm, FaStar } from "react-icons/fa";

import aboutTempleMain from "../assets/images/24.jpg";
import aboutNatureSerene from "../assets/images/30.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const essenceCards = [
  {
    icon: <GiTriquetra className="text-orange-500 text-3xl" />,
    title: "Ancient Heritage",
    body: "Holeshwar Mahadev Mandir holds deep spiritual roots in Gujarat and has been worshipped by devotees for generations.",
  },
  {
    icon: <GiLotus className="text-amber-500 text-3xl" />,
    title: "Shiva's Abode",
    body: "The temple is dedicated to Lord Shiva, revered as the divine protector and spiritual guide of devotees.",
  },
  {
    icon: <GiPrayer className="text-orange-500 text-3xl" />,
    title: "Living Tradition",
    body: "Daily aartis, poojas, and major festivals continue to keep the sacred traditions alive with devotion.",
  },
  {
    icon: <FaOm className="text-amber-500 text-3xl" />,
    title: "Open to All",
    body: "The temple welcomes every devotee with peace, faith, and spiritual warmth.",
  },
];

const timeline = [
  {
    year: "Ancient",
    title: "Divine Origin",
    desc: "The sacred Shivling is believed to hold deep spiritual significance, making this temple a revered destination.",
  },
  {
    year: "Heritage",
    title: "Regional Importance",
    desc: "Holeshwar Mahadev became a spiritually important temple for devotees across the surrounding region.",
  },
  {
    year: "Modern",
    title: "Temple Development",
    desc: "Facilities and infrastructure improved over time to better serve pilgrims and visitors.",
  },
  {
    year: "Today",
    title: "Thriving Pilgrimage",
    desc: "Thousands of devotees visit for darshan, festivals, and spiritual blessings every year.",
  },
];

function About() {
  return (
    <div className="bg-orange-50 overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img
          src={aboutTempleMain}
          alt="Holeshwar Mahadev Temple"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 pt-24 w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-orange-200 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5 backdrop-blur-sm"
            >
              <GiTriquetra />
              Our Story
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold text-white leading-tight mb-5"
            >
              About The
              <span className="block text-orange-300">
                Sacred Temple
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/80 text-lg leading-relaxed"
            >
              Discover the spiritual heritage, sacred traditions, and divine
              significance of Holeshwar Mahadev Temple.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FaOm className="text-white/30 text-5xl mx-auto mb-4" />

          <blockquote className="text-2xl md:text-3xl font-bold text-white italic">
            "ॐ नमः शिवाय — I bow to the auspicious Lord Shiva"
          </blockquote>

          <p className="text-white/80 text-sm mt-4">
            The eternal mantra of peace, surrender, and spiritual awakening
          </p>
        </div>
      </section>

      {/* ESSENCE */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-600 uppercase tracking-[0.35em] text-sm font-semibold">
              Our Essence
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-5">
              Why Holeshwar Mahadev?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {essenceCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-orange-100 hover:shadow-2xl transition-all"
              >
                <div className="h-14 w-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">
                  {card.icon}
                </div>

                <h3 className="text-xl font-bold text-stone-900">
                  {card.title}
                </h3>

                <p className="text-stone-600 mt-3 leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={aboutTempleMain}
              alt="Temple Heritage"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </motion.div>

          <div>
            <p className="text-orange-600 uppercase tracking-[0.35em] text-sm font-semibold">
              Temple History
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-5">
              Our Sacred Journey
            </h2>

            <div className="mt-10 space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <FaStar className="text-white text-xs" />
                    </div>

                    {i < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-orange-200 mt-2" />
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                      {item.year}
                    </span>

                    <h4 className="text-xl font-bold text-stone-900 mt-3">
                      {item.title}
                    </h4>

                    <p className="text-stone-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NATURE SECTION */}
      <section className="relative overflow-hidden">
        <img
          src={aboutNatureSerene}
          alt="Sacred surroundings"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-orange-200 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-sm">
                <GiLotus />
                Sacred Surroundings
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mt-6">
                Where Nature Meets
                <span className="block text-orange-300">
                  Divinity
                </span>
              </h2>

              <p className="text-white/80 text-lg leading-relaxed mt-6">
                Surrounded by peaceful natural beauty, Holeshwar Mahadev offers
                devotees a spiritual retreat filled with serenity and divine calm.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                {["🌿 Tranquil Setting", "🌊 Peaceful Energy", "🏔 Sacred Landscape"].map(
                  (item) => (
                    <div
                      key={item}
                      className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-white backdrop-blur-sm"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;