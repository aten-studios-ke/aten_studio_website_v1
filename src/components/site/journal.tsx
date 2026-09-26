"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { TypographicLink } from "./typographic-link";

export type JournalItem = {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  read: string;
};

export function Journal({ posts }: { posts: JournalItem[] }) {
  return (
    <section id="journal" className="bg-background py-[8rem] md:py-[10rem]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-[60px]">
        <SectionHeading
          index="04"
          eyebrow="Journal"
          title="From Aten"
          intro="Field notes, project write-ups and stories from inside the studio."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-5 gap-y-12 md:mt-20 md:grid-cols-3 md:gap-y-0">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <a href="#journal" className="group block">
                {/* Pure image — no rounded corners, no overlay badge */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center gap-3 label-mono text-foreground/45">
                    <span className="text-gold">{post.type}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground/25" />
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground/25" />
                    <span>{post.read}</span>
                  </div>
                  <h3 className="editorial-h3 text-[1.4rem] text-foreground transition-colors duration-300 group-hover:text-gold md:text-[1.5rem]">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-foreground/60">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 label-mono text-foreground/65 transition-colors group-hover:text-gold">
                    Read
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <TypographicLink href="#journal" variant="muted">
            Explore More
          </TypographicLink>
        </Reveal>
      </div>
    </section>
  );
}
