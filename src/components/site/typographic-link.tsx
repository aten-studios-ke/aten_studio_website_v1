import { ArrowUpRight, ArrowRight } from "lucide-react";

/**
 * TypographicLink — text + arrow CTA with underline reveal.
 * Per spec: buttons should feel typographic, arrow-based, no pills.
 */
export function TypographicLink({
  children,
  href = "#",
  variant = "default",
  arrow = "upright",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "default" | "gold" | "muted";
  arrow?: "upright" | "right";
  className?: string;
}) {
  const color =
    variant === "gold"
      ? "btn-type--gold"
      : variant === "muted"
        ? "btn-type--muted"
        : "";
  const Arrow = arrow === "right" ? ArrowRight : ArrowUpRight;
  return (
    <a href={href} className={`btn-type ${color} ${className}`}>
      {children}
      <Arrow className="btn-arrow h-4 w-4" strokeWidth={1.75} />
    </a>
  );
}
