"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { Reveal } from "./reveal";

const DISCIPLINES = [
  "Creative Technology",
  "Software Development",
  "Film & Media",
  "Photography",
  "Digital Skills",
  "Not sure yet",
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [discipline, setDiscipline] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("discipline", discipline);
    data.set("budget", "Let's discuss");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
      form.reset();
      setDiscipline("");
    } catch {
      setStatus("error");
      setError("Network error — please try again.");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-background py-[8rem] md:py-[10rem]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-[60px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — statement */}
          <div className="flex flex-col justify-between">
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="label-mono text-gold">05</span>
                <span className="h-px w-10 bg-gold/60" />
                <span className="eyebrow text-foreground/55">Contact</span>
              </div>
              <h2 className="editorial-h1 text-[clamp(3rem,8vw,6.5rem)] text-foreground">
                Have something
                <br />
                <span className="text-gold">to make?</span>
              </h2>
              <p className="mt-8 max-w-md text-[1.0625rem] leading-[1.5] text-foreground/70">
                Tell us what you&apos;re working on. We take on a small number of
                projects each quarter — the earlier we talk, the better we can
                help.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <p className="label-mono mb-3 text-foreground/40">Direct</p>
              <a
                href="mailto:atenstudioske@gmail.com"
                className="group inline-flex items-center gap-3 text-[1.25rem] text-foreground transition-colors hover:text-gold md:text-[1.5rem]"
              >
                <Mail className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span className="link-underline">atenstudioske@gmail.com</span>
                <ArrowUpRight
                  className="h-5 w-5 text-foreground/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>

              <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8">
                <div>
                  <p className="label-mono mb-1.5 text-foreground/40">Studio</p>
                  <p className="text-[0.95rem] text-foreground/80">Kisumu, Kenya</p>
                </div>
                <div>
                  <p className="label-mono mb-1.5 text-foreground/40">Response</p>
                  <p className="text-[0.95rem] text-foreground/80">Within 2 business days</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — form with underline inputs */}
          <div className="lg:pl-8">
            <Reveal delay={0.1}>
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[28rem] flex-col items-start justify-center"
                  >
                    <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-none bg-gold text-background">
                      <Check className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <h3 className="editorial-h2 text-[2rem] text-foreground md:text-[2.5rem]">
                      Message received.
                    </h3>
                    <p className="mt-4 max-w-sm text-foreground/65">
                      Thanks for reaching out. We&apos;ll get back to you within
                      two business days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="btn-type btn-type--gold mt-8"
                    >
                      Send another
                      <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.75} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    className="space-y-8"
                  >
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="input-underline-label">
                          Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          placeholder="Your name"
                          className="input-underline"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="input-underline-label">
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          className="input-underline"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="input-underline-label">
                        Company / Organisation
                      </label>
                      <input
                        id="company"
                        name="company"
                        placeholder="Optional"
                        className="input-underline"
                      />
                    </div>

                    {/* Project type — typographic selectable list, not chips */}
                    <div>
                      <span className="input-underline-label">Project Type</span>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5">
                        {DISCIPLINES.map((d) => {
                          const isActive = discipline === d;
                          return (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setDiscipline(d)}
                              className={`text-[0.85rem] tracking-wide transition-colors duration-300 ${
                                isActive
                                  ? "text-gold"
                                  : "text-foreground/55 hover:text-foreground"
                              }`}
                            >
                              <span className="mr-1.5 text-gold/60">
                                {isActive ? "●" : "○"}
                              </span>
                              {d}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="input-underline-label">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="What are you making? Timeline, scope, anything we should know."
                        className="input-underline"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-[0.9rem] text-foreground/80">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-solid group w-full sm:w-auto"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                          Sending
                        </>
                      ) : (
                        <>
                          Send
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            strokeWidth={2}
                          />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
