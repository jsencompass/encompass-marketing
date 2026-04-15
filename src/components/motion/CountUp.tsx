"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.9,
  formatThousands = true,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  formatThousands?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display] = useState(value);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);
  const reduced = useReducedMotion();

  const format = useCallback(
    (n: number) => {
      const rounded = Math.round(n);
      if (formatThousands) return new Intl.NumberFormat("en-US").format(rounded);
      return String(rounded);
    },
    [formatThousands]
  );

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    // Use ref-based DOM manipulation to avoid setState-in-effect lint
    el.textContent = `${prefix}${format(0)}${suffix}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.unobserve(el);

          const ms = duration * 1000;
          const animStart = performance.now();
          const tick = (now: number) => {
            const elapsed = now - animStart;
            const progress = Math.min(elapsed / ms, 1);
            const current = Math.round(easeOutCubic(progress) * value);
            el.textContent = `${prefix}${format(current)}${suffix}`;
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDone(true);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, value, duration, format, prefix, suffix]);

  return (
    <span
      ref={ref}
      suppressHydrationWarning
      className={`transition-shadow duration-600 ${done || reduced ? "drop-shadow-[0_0_24px_rgba(108,92,231,0.25)]" : ""}`}
    >
      {prefix}{format(display)}{suffix}
    </span>
  );
}
