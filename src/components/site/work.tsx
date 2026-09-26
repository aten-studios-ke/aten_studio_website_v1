"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export type ProjectItem = {
  id: string;
  title: string;
  category: "Film" | "Media" | "Photography" | "Software" | "Creative Technology";
  year: string;
  image: string;
  layout: "wide" | "tall" | "square" | "offset";
};

const FILTERS = [
  "All",
  "Film",
  "Media",
  "Photography",
  "Software",
  "Creative Technology",
] as const;

export function Work({ projects }: { projects: ProjectItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Large / Small / Large / Small editorial rhythm
  const spanFor = (layout: ProjectItem["layout"]) => {
    switch (layout) {
      case "wide":
        return "md:col-span-8";
      case "tall":
        return "md:col-span-4 md:row-span-2";
      case "square":
        return "md:col-span-4";
      case "offset":
        return "md:col-span-4";
      default:
        return "md:col-span-6";
    }
  };

  const ratioFor = (layout: ProjectItem["layout"]) => {
    switch (layout) {
      case "wide":
        return "16/10";
      case "tall":
        return "3/4";
      case "square":
        return "4/3";
      case "offset":
        return "3/4";
      default:
        return "3/2";
    }
  };

  return (
    <section id="work" className="bg-background py-[8rem] md:py-[10rem]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-[60px]">
        <SectionHeading
          index="01"
          eyebrow="Selected Work"
          title="What We Create"
          intro="Recent work across film, media, photography, software and creative technology — built with and for people who care about craft."
        />

        {/* Category navigation — text only, accent underline for active. No pills. */}
        <Reveal delay={0.1} className="mt-12 border-b border-border pb-px md:mt-16">
          <div className="no-scrollbar flex gap-7 overflow-x-auto">
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`relative shrink-0 pb-4 text-[0.78rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                    isActive ? "text-gold" : "text-foreground/45 hover:text-foreground"
                  }`}
                >
                  {f}
                  {isActive && (
                    <motion.span
                      layoutId="cat-active"
                      className="absolute inset-x-0 -bottom-px h-px bg-gold"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Editorial masonry grid */}
        <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-12 md:mt-16 md:grid-cols-12 md:gap-y-16">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.a
                key={p.title}
                href="#contact"
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`group block ${spanFor(p.layout)}`}
              >
                {/* Pure image — no card, no overlay, no rounded corners */}
                <div className="relative overflow-hidden" style={{ aspectRatio: ratioFor(p.layout) }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>

                {/* Metadata — positioned independently below image */}
                <div className="mt-4 flex items-start justify-between gap-4 transition-transform duration-400 group-hover:-translate-y-[3px]">
                  <div>
                    <h3 className="editorial-h3 text-[1.25rem] text-foreground md:text-[1.4rem]">
                      {p.title}
                    </h3>
                    <p className="mt-1 label-mono text-foreground/50">
                      {p.category} · {p.year}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-foreground/30 transition-all duration-400 group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
