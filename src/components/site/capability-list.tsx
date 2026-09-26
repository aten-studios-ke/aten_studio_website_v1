"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const CAPABILITIES = [
  {
    no: "01",
    title: "Creative Technology",
    desc: "Digital experiences, interactive work, technology-driven creative projects and creative digital systems.",
    tags: ["Installations", "Interactive", "Generative", "R&D"],
    image: "/images/work-creative-tech.jpg",
  },
  {
    no: "02",
    title: "Software Development",
    desc: "Web applications, digital platforms, software systems, APIs and backend systems — designed and engineered end-to-end.",
    tags: ["Web", "Apps", "Platforms", "Backend"],
    image: "/images/work-software.jpg",
  },
  {
    no: "03",
    title: "Film & Media Production",
    desc: "Films, documentaries, short films, event media, reels and institutional storytelling — from direction to grade.",
    tags: ["Film", "Documentary", "Reels", "Post"],
    image: "/images/featured.jpg",
  },
  {
    no: "04",
    title: "Photography",
    desc: "Events, documentary, portraiture, cultural, institutional, editorial and commercial photography.",
    tags: ["Events", "Portraits", "Editorial", "Products"],
    image: "/images/work-photography.jpg",
  },
  {
    no: "05",
    title: "Digital Skills Training",
    desc: "Practical technology education, training and cohort-based learning programs for individuals, teams and institutions.",
    tags: ["Workshops", "Curriculum", "Mentorship", "Teams"],
    image: "/images/journal-3.jpg",
  },
];

export function CapabilityList() {
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="bg-background py-[8rem] md:py-[10rem]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-[60px]">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title="What We Do"
          intro="Five disciplines, one studio. We move between them fluently — most of the best work happens where they meet."
        />

        {/* Interactive catalogue: vertical index + hover image reveal */}
        <Reveal delay={0.1} className="mt-14 md:mt-20">
          {/* Desktop / tablet — hover image preview */}
          <div className="hidden md:block">
            <div className="grid grid-cols-12 gap-5">
              {/* Left — the index */}
              <div className="col-span-8">
                {CAPABILITIES.map((c, i) => {
                  const isHovered = hovered === i;
                  return (
                    <div
                      key={c.no}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      className="group relative border-b border-border"
                      style={{ minHeight: "118px" }}
                    >
                      <div className="flex h-[118px] items-center gap-6">
                        <span className="label-mono w-8 shrink-0 text-foreground/35 transition-colors duration-300 group-hover:text-gold">
                          {c.no}
                        </span>
                        <h3
                          className={`editorial-h2 flex-1 text-[clamp(1.75rem,3.5vw,2.75rem)] transition-colors duration-300 ${
                            isHovered ? "text-gold" : "text-foreground group-hover:text-gold"
                          }`}
                        >
                          {c.title}
                        </h3>
                        <span
                          className={`label-mono transition-opacity duration-300 ${
                            isHovered ? "opacity-100 text-gold" : "opacity-0"
                          }`}
                        >
                          View →
                        </span>
                      </div>

                      {/* Reveal description + tags inline on hover */}
                      <AnimatePresence initial={false}>
                        {isHovered && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-7 pl-14">
                              <p className="max-w-xl text-[0.95rem] leading-relaxed text-foreground/65">
                                {c.desc}
                              </p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {c.tags.map((t) => (
                                  <span key={t} className="label-mono text-foreground/40">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Right — sticky image that updates on hover */}
              <div className="col-span-4">
                <div className="sticky top-28">
                  <div className="relative aspect-[3/4] overflow-hidden bg-card">
                    <AnimatePresence mode="sync">
                      <motion.img
                        key={hovered ?? "default"}
                        src={CAPABILITIES[hovered ?? 0].image}
                        alt={CAPABILITIES[hovered ?? 0].title}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="label-mono text-gold">
                        {CAPABILITIES[hovered ?? 0].no}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile — accordion */}
          <div className="md:hidden">
            {CAPABILITIES.map((c, i) => {
              const isOpen = open === i;
              return (
                <div key={c.no} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 py-7 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="label-mono w-7 shrink-0 text-foreground/35">{c.no}</span>
                    <span
                      className={`editorial-h2 flex-1 text-[1.5rem] transition-colors duration-300 ${
                        isOpen ? "text-gold" : "text-foreground"
                      }`}
                    >
                      {c.title}
                    </span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-foreground transition-all duration-400 ${
                        isOpen ? "rotate-45 text-gold" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="relative mb-6 aspect-[3/2] overflow-hidden">
                          <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                        </div>
                        <p className="mb-4 max-w-md text-[0.95rem] leading-relaxed text-foreground/70">
                          {c.desc}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 pb-7">
                          {c.tags.map((t) => (
                            <span key={t} className="label-mono text-foreground/40">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
