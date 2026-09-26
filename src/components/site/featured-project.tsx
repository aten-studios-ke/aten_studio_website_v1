"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Play, ExternalLink } from "lucide-react";
import { Reveal } from "./reveal";
import { TypographicLink } from "./typographic-link";
import type { FeaturedData } from "@/app/page";

/** Convert any YouTube/Vimeo URL to an embeddable iframe URL. */
function toEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    // YouTube
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    // Vimeo
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    if (host === "player.vimeo.com") return url;
    return null;
  } catch {
    return null;
  }
}

export function FeaturedProject({ featured }: { featured: FeaturedData | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  if (!featured) return null;

  const embed = featured.videoUrl ? toEmbed(featured.videoUrl) : null;
  const hasGallery = featured.galleryImages.length > 0;

  return (
    <section className="relative bg-background py-[8rem] md:py-[10rem]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-[60px]">
        <Reveal className="mb-10 flex items-center gap-4">
          <span className="h-px w-10 bg-gold/60" />
          <span className="eyebrow text-foreground/55">Featured Project</span>
        </Reveal>

        {/* Media: video embed if available, otherwise the hero image */}
        <div ref={ref} className="relative overflow-hidden">
          {embed ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={embed}
                title={featured.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <motion.img
              src={featured.heroImage}
              alt={featured.title}
              style={{ y }}
              className="h-[60vh] w-full scale-110 object-cover md:h-[82vh]"
            />
          )}
          {embed && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 bg-background/85 px-3 py-1.5 label-mono text-gold backdrop-blur">
              <Play className="h-3 w-3 fill-gold" strokeWidth={1} /> Video
            </span>
          )}
        </div>

        {/* Metadata positioned independently below the media */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label-mono mb-3 text-gold">
                {featured.category} · {featured.year}
              </p>
              <h2 className="editorial-h2 text-[clamp(2rem,5vw,3.5rem)] text-foreground">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-foreground/65">
                {featured.description ?? ""}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.1}>
              <dl className="space-y-5 border-t border-border pt-5">
                {featured.role && (
                  <div className="flex justify-between gap-4">
                    <dt className="label-mono text-foreground/40">Role</dt>
                    <dd className="text-right text-[0.9rem] text-foreground/80">
                      {featured.role}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="label-mono text-foreground/40">Year</dt>
                  <dd className="text-right text-[0.9rem] text-foreground/80">
                    {featured.year}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="label-mono text-foreground/40">Discipline</dt>
                  <dd className="text-right text-[0.9rem] text-foreground/80">
                    {featured.category}
                  </dd>
                </div>
              </dl>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <TypographicLink href="#contact" variant="gold">
                  View Project
                </TypographicLink>
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-type btn-type--muted"
                  >
                    Visit Live
                    <ExternalLink className="btn-arrow h-4 w-4" strokeWidth={1.75} />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Gallery — for photography albums */}
        {hasGallery && (
          <div className="mt-16">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="eyebrow text-foreground/55">
                Gallery · {featured.galleryImages.length} images
              </span>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {featured.galleryImages.map((src, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div
                    className={`relative overflow-hidden ${
                      i % 5 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"
                    }`}
                  >
                    { }
                    <img
                      src={src}
                      alt={`${featured.title} — ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
