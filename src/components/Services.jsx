import React from "react";
import { Code, LayoutDashboard, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const ITEMS = [
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Full‑stack Apps",
    desc: "React + Node with clean architecture and performance budgets.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-accent" />,
    title: "Admin Dashboards",
    desc: "Role‑based dashboards with charts, tables, filters, and exports.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-green-600" />,
    title: "Launch & Growth",
    desc: "SEO, analytics, and A/B ready landing pages that convert.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {ITEMS.map((it, i) => (
            <motion.article
              key={i}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft"
            >
              <div className="mb-4">{it.icon}</div>
              <h3 className="text-xl font-semibold">{it.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{it.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
