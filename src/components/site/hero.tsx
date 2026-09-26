"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { TypographicLink } from "./typographic-link";

const SLIDES = [
  { src: "/images/hero.jpg", label: "Creative Technology" },
  { src: "/images/studio.jpg", label: "Studio" },
  { src: "/images/journal-2.jpg", label: "Software" },
  { src: "/images/journal-3.jpg", label: "Practice" },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % SLIDES.length);
    }, 4800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-background pt-[68px] md:pt-[80px]"
    >
      <div className="mx-auto grid min-h-[calc(100vh-68px)] max-w-[1320px] grid-cols-1 px-5 md:min-h-[calc(100vh-80px)] md:grid-cols-12 md:gap-5 md:px-[60px]">
        {/* LEFT — typography (7 cols) */}
        <div className="flex flex-col justify-between py-7 md:col-span-7 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="eyebrow text-gold">Aten Studio KE — Kisumu</span>
          </motion.div>

          <div className="py-5 md:py-0">
            <h1 className="editorial-h1 text-[clamp(3rem,11vw,7.5rem)] text-foreground">
              <motion.span
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                We Create
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gold"
              >
                Things.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-6 max-w-md text-[1.0625rem] leading-[1.5] text-foreground/70 md:mt-8"
            >
              Creative technology, film, media, photography, software and
              digital skills. One studio where technology meets creative
              practice.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62 }}
              className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-10"
            >
              <TypographicLink href="#work" variant="default">
                View Work
              </TypographicLink>
              <TypographicLink href="#contact" variant="gold">
                Start a Project
              </TypographicLink>
            </motion.div>
          </div>

          {/* Slide indicators — desktop only here; mobile moves them under the image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden items-center justify-between border-t border-border pt-5 md:flex"
          >
            <div className="flex items-center gap-4">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex items-center gap-2"
                  aria-label={`Show ${s.label}`}
                >
                  <span
                    className={`h-px transition-all duration-500 ${
                      i === active ? "w-10 bg-gold" : "w-5 bg-foreground/25"
                    }`}
                  />
                  <span
                    className={`label-mono transition-colors duration-300 ${
                      i === active ? "text-gold" : "text-foreground/35"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
            <a
              href="#work"
              className="flex items-center gap-2 text-foreground/45 transition-colors hover:text-foreground"
            >
              <span className="label-mono">Scroll</span>
              <ArrowDown className="h-4 w-4 animate-bounce" strokeWidth={1.5} />
            </a>
          </motion.div>
        </div>

        {/* RIGHT — oversized bleeding visual (5 cols) */}
        <div className="relative min-h-[34vh] md:col-span-5 md:min-h-0">
          {/* Desktop: absolute, bleeds right past the grid */}
          <div className="absolute inset-y-0 left-0 right-0 overflow-hidden md:-right-[60px]">
            <AnimatePresence mode="sync">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.06, x: "2%" }}
                animate={{ opacity: 1, scale: 1, x: "0%" }}
                exit={{ opacity: 0, scale: 1, x: "-1%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={SLIDES[active].src}
                  alt={SLIDES[active].label}
                  className="h-full w-full object-cover"
                  fetchPriority={active === 0 ? "high" : "auto"}
                />
              </motion.div>
            </AnimatePresence>
            {/* subtle vignette for depth, no rounded container */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />

            {/* floating discipline label */}
            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="label-mono text-foreground"
                >
                  {SLIDES[active].label}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile-only slide indicators + scroll cue, anchored under the image */}
          <div className="absolute -bottom-1 left-0 right-0 flex items-center justify-between border-t border-border pt-3 md:hidden">
            <div className="flex items-center gap-3">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex items-center gap-1.5"
                  aria-label={`Show ${s.label}`}
                >
                  <span
                    className={`h-px transition-all duration-500 ${
                      i === active ? "w-7 bg-gold" : "w-4 bg-foreground/25"
                    }`}
                  />
                </button>
              ))}
            </div>
            <a
              href="#work"
              className="flex items-center gap-1.5 text-foreground/45"
            >
              <span className="label-mono">Scroll</span>
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
