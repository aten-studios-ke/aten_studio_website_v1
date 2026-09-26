import Image from "next/image";

/**
 * ATEN Studio KE — site logo.
 *
 * Currently renders a refined typographic wordmark (ATEN with a gold dot)
 * as a placeholder. When the official logo asset is available, drop it at
 * `public/logo.png` and flip `USE_IMAGE_LOGO` to `true` — every header,
 * footer and mobile menu will pick it up automatically.
 */
const USE_IMAGE_LOGO = false;

export function SiteLogo({
  className = "",
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "mark";
}) {
  if (USE_IMAGE_LOGO) {
    return (
      <Image
        src="/logo.png"
        alt="ATEN Studio KE"
        width={140}
        height={40}
        priority
        className={`h-7 w-auto object-contain md:h-8 ${className}`}
      />
    );
  }

  if (variant === "mark") {
    return (
      <span
        className={`font-display text-2xl font-bold tracking-tight ${className}`}
        aria-label="ATEN Studio KE"
      >
        ATEN<span className="text-gold">.</span>
      </span>
    );
  }

  return (
    <span
      className={`flex items-baseline gap-[0.16em] font-display text-xl font-bold leading-none tracking-tight md:text-[1.5rem] ${className}`}
      aria-label="ATEN Studio KE"
    >
      <span>ATEN</span>
      <span className="text-gold text-[0.42em] leading-none translate-y-[-0.15em]">
        ●
      </span>
    </span>
  );
}
