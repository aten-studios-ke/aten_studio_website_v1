"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./reveal";
import { TypographicLink } from "./typographic-link";

const STATS = [
  { value: "120+", label: "Projects shipped" },
  { value: "1 yr", label: "In practice" },
  { value: "5", label: "Disciplines" },
  { value: "Kisumu", label: "Based · Worldwide" },
];

export function Studio() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="studio" className="bg-background py-[8rem] md:py-[10rem]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-[60px]">
        {/* Large typography statement — occupies most of viewport width */}
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="label-mono text-gold">02</span>
            <span className="h-px w-10 bg-gold/60" />
            <span className="eyebrow text-foreground/55">Studio</span>
          </div>
          <h2 className="editorial-h1 max-w-[16ch] text-[clamp(2.5rem,7.5vw,6rem)] text-foreground">
            Aten is a studio built around{" "}
            <span className="text-gold">creative practice.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Visual */}
          <div className="lg:col-span-7">
            <div ref={ref} className="relative overflow-hidden">
              <motion.img
                src="/images/studio.jpg"
                alt="ATEN Studio KE interior"
                style={{ y }}
                className="h-[56vh] w-full scale-110 object-cover md:h-[72vh]"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-between lg:col-span-5 lg:pl-8">
            <Reveal delay={0.1}>
              <p className="text-[1.0625rem] leading-[1.55] text-foreground/75">
                We are a Kisumu-born studio working across film, media,
                photography, software and creative technology. We create things
                that are useful, beautiful and built to last — for brands,
                artists, institutions and communities.
              </p>
              <p className="mt-5 text-[1.0625rem] leading-[1.55] text-foreground/75">
                Our model is simple: <span className="text-gold">Build</span>{" "}
                technology and software. <span className="text-gold">Create</span>{" "}
                film, photography and media.{" "}
                <span className="text-gold">Develop</span> digital skills and
                people. One studio, multiple capabilities, one coherent system.
              </p>
              <div className="mt-8">
                <TypographicLink href="#contact" variant="gold">
                  Work with Aten
                </TypographicLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats — restrained, no card backgrounds */}
        <Reveal
          delay={0.1}
          className="mt-16 grid grid-cols-2 gap-y-10 border-t border-border pt-12 md:mt-20 md:grid-cols-4 md:gap-y-0"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className={i > 0 ? "md:pl-8 md:border-l md:border-border" : ""}>
              <p className="editorial-h2 text-[clamp(2rem,4vw,3.25rem)] text-foreground">
                {s.value}
              </p>
              <p className="label-mono mt-2 text-foreground/45">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
