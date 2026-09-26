"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SiteLogo } from "./site-logo";
import { TypographicLink } from "./typographic-link";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1320px] items-center justify-between px-5 transition-all duration-500 md:px-[60px] ${
            scrolled ? "h-[68px] md:h-[72px]" : "h-[68px] md:h-[80px]"
          }`}
        >
          <a
            href="#top"
            className="flex items-center"
            aria-label="ATEN Studio KE — home"
          >
            <SiteLogo />
          </a>

          {/* Desktop nav — right aligned, quiet */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-[0.8rem] uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
            <TypographicLink href="#contact" variant="gold">
              Start a Project
            </TypographicLink>
          </nav>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-[68px] shrink-0 items-center justify-between px-5">
              <SiteLogo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col px-5 pt-4" aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.45 }}
                  className="editorial-h2 border-b border-border py-5 text-[2rem] text-foreground"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.45 }}
              className="px-5 pt-8"
            >
              <TypographicLink href="#contact" variant="gold" className="text-base">
                Start a Project
              </TypographicLink>
            </motion.div>

            <div className="mt-auto px-5 pb-10 pt-8">
              <p className="label-mono mb-2 text-foreground/40">Contact</p>
              <a
                href="mailto:atenstudioske@gmail.com"
                className="text-gold link-underline"
              >
                atenstudioske@gmail.com
              </a>
              <p className="mt-1.5 text-[0.9rem] text-foreground/50">
                Kisumu, Kenya
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
