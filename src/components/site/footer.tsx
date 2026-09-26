import { ArrowUpRight } from "lucide-react";
import { SiteLogo } from "./site-logo";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

const DISCIPLINES = [
  "Creative Technology",
  "Film & Media",
  "Photography",
  "Software",
  "Digital Skills",
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      {/* Footer grid */}
      <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-[60px] md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <SiteLogo className="text-2xl" />
            <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-foreground/55">
              Creative technology, film &amp; media, photography, software and
              digital skills. Kisumu-born, working worldwide.
            </p>
            <p className="mt-5">
              <a
                href="mailto:atenstudioske@gmail.com"
                className="link-underline text-[0.95rem] text-gold"
              >
                atenstudioske@gmail.com
              </a>
            </p>
          </div>

          {/* Disciplines */}
          <div className="md:col-span-3">
            <p className="label-mono mb-4 text-foreground/40">Disciplines</p>
            <ul className="space-y-2.5">
              {DISCIPLINES.map((d) => (
                <li key={d}>
                  <a
                    href="#services"
                    className="link-underline text-[0.9rem] text-foreground/70 hover:text-foreground"
                  >
                    {d}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div className="md:col-span-2">
            <p className="label-mono mb-4 text-foreground/40">Studio</p>
            <ul className="space-y-2.5">
              <li>
                <a href="#work" className="link-underline text-[0.9rem] text-foreground/70 hover:text-foreground">
                  Work
                </a>
              </li>
              <li>
                <a href="#studio" className="link-underline text-[0.9rem] text-foreground/70 hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#journal" className="link-underline text-[0.9rem] text-foreground/70 hover:text-foreground">
                  Journal
                </a>
              </li>
              <li>
                <a href="#contact" className="link-underline text-[0.9rem] text-foreground/70 hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-2">
            <p className="label-mono mb-4 text-foreground/40">Follow</p>
            <ul className="space-y-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[0.9rem] text-foreground/70 hover:text-foreground"
                  >
                    <span className="link-underline">{s.label}</span>
                    <ArrowUpRight
                      className="h-3 w-3 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label-mono text-foreground/40">ATEN Studio KE</span>
            <span className="hidden h-1 w-1 rounded-full bg-foreground/25 md:inline-block" />
            <span className="label-mono text-foreground/40">Kisumu · Worldwide</span>
          </div>
          <p className="label-mono text-foreground/40">
            © {new Date().getFullYear()} ATEN Studio KE
          </p>
        </div>
      </div>
    </footer>
  );
}
