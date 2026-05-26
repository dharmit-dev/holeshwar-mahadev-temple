// src/assets/images/index.js
// ─── Jyotirlinga images (01–08 named, 09–12 from numbered series) ───
import imgSomnath        from "./01-somnath.jpg";
import imgRameshwaram    from "./02-rameshwaram.jpg";
import imgMahakaleshwar  from "./03-mahakaleshwar.jpg";
import imgKashiVishwanath from "./04-kashi-vishwanath.jpg";
import imgBhimashankar   from "./05-bhimashankar.jpg";
import imgTrimbakeshwar  from "./06-trimbakeshwar.jpg";
import imgNageshwar      from "./07-nageshwar.jpg";
import imgVaidyanath     from "./08-vaidyanath.jpg";
import imgGrishneshwar   from "./9.png";
import imgKedarnath      from "./10.png";
import imgMallikarjuna   from "./11.png";
import imgOmkareshwar    from "./12.png";

// ─── Hero ────────────────────────────────────────────
import imgHero28         from "./28.jpg";
import imgTempleHero     from "./temple-hero.jpg";
import imgShivStatue     from "./shiv-statue.jpg";
import imgShivling       from "./shivling.jpg";

// ─── About ───────────────────────────────────────────
import imgAbout24        from "./24.jpg";
import imgNature30       from "./30.jpg";

// ─── Gallery highlights ───────────────────────────────
import imgGallery25      from "./25.jpg";
import imgGallery26      from "./26.jpg";
import imgGallery27      from "./27.jpg";
import imgGallery29      from "./29.jpg";

// ─── Numbered gallery (1.png – 23.png) ───────────────
import imgP1  from "./1.png";
import imgP2  from "./2.png";
import imgP3  from "./3.png";
import imgP4  from "./4.png";
import imgP5  from "./5.png";
import imgP6  from "./6.png";
import imgP7  from "./7.png";
import imgP8  from "./8.png";
import imgP13 from "./13.png";
import imgP14 from "./14.png";
import imgP15 from "./15.png";
import imgP16 from "./16.png";
import imgP17 from "./17.png";
import imgP18 from "./18.png";
import imgP19 from "./19.png";
import imgP20 from "./20.png";
import imgP21 from "./21.png";
import imgP22 from "./22.png";
import imgP23 from "./23.png";

// ─── Named exports ────────────────────────────────────
export {
  imgHero28, imgTempleHero, imgShivStatue, imgShivling,
  imgAbout24, imgNature30,
  imgGallery25, imgGallery26, imgGallery27, imgGallery29,
};

// 12 Jyotirlinga array — exact order, exact user mapping
export const JYOTIRLINGA_DATA = [
  { id: 1,  image: imgSomnath,         name: "Somnath",          location: "Prabhas Patan, Gujarat",        meaning: "Lord of the Moon — the first and foremost among all 12 Jyotirlingas. Destroyed and rebuilt 17 times, yet eternal." },
  { id: 2,  image: imgRameshwaram,     name: "Rameshwaram",      location: "Tamil Nadu",                    meaning: "Worshipped by Lord Ram before crossing the sea to Lanka. Southernmost sacred Jyotirlinga in Bharat." },
  { id: 3,  image: imgMahakaleshwar,   name: "Mahakaleshwar",    location: "Ujjain, Madhya Pradesh",        meaning: "The Great Lord of Time and Death. Only south-facing Jyotirlinga — performs the legendary Bhasma Aarti." },
  { id: 4,  image: imgKashiVishwanath, name: "Kashi Vishwanath", location: "Varanasi, Uttar Pradesh",       meaning: "Ruler of the Universe. In the eternal city of light where moksha is granted to all who die here." },
  { id: 5,  image: imgBhimashankar,    name: "Bhimashankar",     location: "Pune District, Maharashtra",    meaning: "The mighty Shiva who defeated the demon Bhima. Sacred origin of the holy Bhima river." },
  { id: 6,  image: imgTrimbakeshwar,   name: "Trimbakeshwar",    location: "Nashik, Maharashtra",           meaning: "The three-eyed Lord near the sacred origin of the Godavari river, the Ganga of the south." },
  { id: 7,  image: imgNageshwar,       name: "Nageshwar",        location: "Dwarka, Gujarat",               meaning: "Lord of Serpents. Protects all devotees from enemies, poisons, and all forms of evil." },
  { id: 8,  image: imgVaidyanath,      name: "Vaidyanath",       location: "Deoghar, Jharkhand",            meaning: "The divine healer — Shiva as the lord of all physicians. Destroys sorrows and cures diseases." },
  { id: 9,  image: imgGrishneshwar,    name: "Grishneshwar",     location: "Ellora, Maharashtra",           meaning: "Lord of compassion. Near the UNESCO-listed Ellora caves — last of the 12 sacred Jyotirlingas." },
  { id: 10, image: imgKedarnath,       name: "Kedarnath",        location: "Rudraprayag, Uttarakhand",      meaning: "Lord of the field. Nestled in the majestic Himalayas at 3,583m — open only 6 months a year." },
  { id: 11, image: imgMallikarjuna,    name: "Mallikarjuna",     location: "Srisailam, Andhra Pradesh",     meaning: "Jasmine-adorned Shiva on the holy Shrishailam hill. One of the 18 Shakti Peethas as well." },
  { id: 12, image: imgOmkareshwar,     name: "Omkareshwar",      location: "Khandwa, Madhya Pradesh",       meaning: "The sacred Om-shaped island on the Narmada river where the primordial OM manifested as Shiva." },
];

// Full gallery image list for Gallery.jsx
export const REAL_GALLERY_IMAGES = [
  { id: "r1",  src: imgHero28,      title: "Temple Front View",        category: "Architecture" },
  { id: "r2",  src: imgTempleHero,  title: "Temple Vista",             category: "Architecture" },
  { id: "r3",  src: imgAbout24,     title: "Sacred Premises",          category: "Architecture" },
  { id: "r4",  src: imgShivStatue,  title: "Divine Shiv Statue",       category: "Architecture" },
  { id: "r5",  src: imgShivling,    title: "Holy Shivling",            category: "Daily Aarti"  },
  { id: "r6",  src: imgGallery25,   title: "Festive Celebration",      category: "Festivals"    },
  { id: "r7",  src: imgGallery26,   title: "Temple Gathering",         category: "Festivals"    },
  { id: "r8",  src: imgGallery27,   title: "Evening Aarti",            category: "Daily Aarti"  },
  { id: "r9",  src: imgGallery29,   title: "Devotional Moment",        category: "Festivals"    },
  { id: "r10", src: imgNature30,    title: "Sacred Surroundings",      category: "Nature"       },
  { id: "r11", src: imgP1,          title: "Temple Moments",           category: "Daily Aarti"  },
  { id: "r12", src: imgP2,          title: "Divine Darshan",           category: "Daily Aarti"  },
  { id: "r13", src: imgP3,          title: "Festival Lights",          category: "Festivals"    },
  { id: "r14", src: imgP4,          title: "Prasad Distribution",      category: "Prasad"       },
  { id: "r15", src: imgP5,          title: "Puja Preparations",        category: "Daily Aarti"  },
  { id: "r16", src: imgP6,          title: "Sawan Celebrations",       category: "Festivals"    },
  { id: "r17", src: imgP7,          title: "Nature Trail",             category: "Nature"       },
  { id: "r18", src: imgP8,          title: "Temple Corridor",          category: "Architecture" },
  { id: "r19", src: imgP13,         title: "Ritual Offering",          category: "Prasad"       },
  { id: "r20", src: imgP14,         title: "Mahashivratri Night",      category: "Festivals"    },
  { id: "r21", src: imgP15,         title: "Morning Abhishek",         category: "Daily Aarti"  },
  { id: "r22", src: imgP16,         title: "Sacred Fire",              category: "Daily Aarti"  },
  { id: "r23", src: imgP17,         title: "Temple Garden",            category: "Nature"       },
  { id: "r24", src: imgP18,         title: "Devotee Prayers",          category: "Daily Aarti"  },
  { id: "r25", src: imgP19,         title: "Diwali at Temple",         category: "Festivals"    },
  { id: "r26", src: imgP20,         title: "Prasad Bhog",              category: "Prasad"       },
  { id: "r27", src: imgP21,         title: "Serene Landscape",         category: "Nature"       },
  { id: "r28", src: imgP22,         title: "Temple Architecture",      category: "Architecture" },
  { id: "r29", src: imgP23,         title: "Holy Premises",            category: "Architecture" },
];