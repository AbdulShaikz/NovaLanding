import React from "react";
import { motion } from "framer-motion";

const DATA = [
  {
    img: "/assets/avatar-1.webp",
    name: "John Doe",
    role: "CEO, StartupX",
    text: "We shipped faster and improved conversions. Clean handover and great communication.",
  },
  {
    img: "/assets/avatar-2.webp",
    name: "Sarah Lee",
    role: "Product Manager",
    text: "Reliable, pixel‑perfect, and accessible. Exactly what we needed.",
  },
  {
    img: "/assets/avatar-3.webp",
    name: "Michael S",
    role: "CTO, InnovateTech",
    text: "Performance and UX focus was outstanding. Would hire again.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Clients Say
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {DATA.map((t, i) => (
            <motion.blockquote
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-soft"
            >
              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={`${t.name} avatar`}
                  loading="lazy"
                  decoding="async"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="text-lg font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t.role}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                “{t.text}”
              </p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
