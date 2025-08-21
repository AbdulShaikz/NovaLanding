import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:flex md:items-center md:justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-tight">
            Launch beautiful products — fast.
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            A production-grade React + Tailwind landing template with dark mode,
            accessibility, and performance built in.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
            >
              Get Started
            </a>
            <a
              href="#services"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
            >
              Explore Services
            </a>
          </div>
          <p className="mt-3 text-sm text-gray-500 mb-3">
            React • Tailwind • Framer Motion • EmailJS
          </p>
        </motion.div>

        <motion.picture
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-10 md:mt-0 w-full max-w-xl md:flex-shrink-0"
          aria-hidden={false}
        >
          {/* Responsive hero images */}
          <source
            srcSet="/assets/hero-mockup-800.webp 800w, /assets/hero-mockup-1200.webp 1200w, /assets/hero-mockup-1600.webp 1600w"
            type="image/webp"
          />
          <div className="aspect-video rounded-2xl overflow-hidden">
            <img
              src="/assets/hero-mockup-1200.webp"
              alt="Analytics dashboard mockup showing charts and KPIs"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.picture>
      </div>
    </header>
  );
}
