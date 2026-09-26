import { Reveal } from "./reveal";

/**
 * SectionHeading — eyebrow + large editorial heading.
 * Per spec: heading occupies ~6 columns, generous whitespace above.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <Reveal className={`grid gap-8 md:grid-cols-12 md:items-end ${className}`}>
      <div className="md:col-span-7">
        <div className="mb-6 flex items-center gap-4">
          <span className="label-mono text-gold">{index}</span>
          <span className="h-px w-10 bg-gold/60" />
          <span className="eyebrow text-foreground/55">{eyebrow}</span>
        </div>
        <h2 className="editorial-h2 text-[clamp(2.5rem,6.5vw,5rem)] text-foreground">
          {title}
        </h2>
      </div>
      {intro ? (
        <p className="max-w-sm text-[0.95rem] leading-relaxed text-foreground/60 md:col-span-4 md:col-start-9">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
