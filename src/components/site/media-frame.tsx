"use client";

import { useState } from "react";

/**
 * MediaFrame — restrained image wrapper.
 * Square corners, deliberate aspect crops, subtle hover scale.
 * Per spec: no card background, no shadow, no rounded rectangle.
 */
export function MediaFrame({
  src,
  alt,
  ratio = "3/2",
  className = "",
  hover = false,
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  hover?: boolean;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`relative overflow-hidden bg-card ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          loaded ? "opacity-100" : "opacity-0"
        } ${hover ? "group-hover:scale-[1.03]" : ""}`}
      />
    </div>
  );
}
