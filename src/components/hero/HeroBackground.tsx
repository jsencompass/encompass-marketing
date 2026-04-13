"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function HeroBackground() {
  const reduced = useReducedMotion();
  const [scrolledPast, setScrolledPast] = useState(false);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Layer 1: Base — solid bg-base (via parent) */}

      {/* Layer 2: Ambient gradient — two radials, slowly breathing */}
      <div
        className={`absolute inset-0 ${reduced ? "" : "hero-ambient"}`}
        style={{
          background: `
            radial-gradient(800px circle at 20% 30%, rgba(108, 92, 231, 0.08), transparent),
            radial-gradient(1000px circle at 80% 70%, rgba(76, 63, 184, 0.06), transparent)
          `,
        }}
      />

      {/* Layer 3: Grid overlay — static structural depth */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="var(--accent-dim)" strokeWidth="0.5" opacity="0.04" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Layer 4: Cursor spotlight — handled by HeroSpotlight parent */}

      {/* Layer 5: Vignette — focal attention on copy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(10, 10, 11, 0.4) 100%)",
        }}
      />

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          scrolledPast ? "opacity-0" : "opacity-60"
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={reduced ? "" : "animate-bounce"}
          style={{ animationDuration: "2s" }}
        >
          <path d="M6 9l6 6 6-6" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}
