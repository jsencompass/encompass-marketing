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
  // SSR-truthful: initial state is the final value so crawlers see the real number
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  const format = useCallback(
    (n: number) => {
      const rounded = Math.round(n);
      if (formatThousands) return new Intl.NumberFormat("en-US").format(rounded);
      return String(rounded);
    },
    [formatThousands]
  );

  // On mount, reset to 0 for animation (only in browser)
  useEffect(() => {
    setMounted(true);
    if (!reduced) {
      setDisplay(0);
    }
  }, [reduced]);

  useEffect(() => {
    if (!mounted || reduced) {
      setDone(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, reduced, started]);

  useEffect(() => {
    if (!started || reduced) return;

    const ms = duration * 1000;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / ms, 1);
      setDisplay(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration, reduced]);

  return (
    <span
      ref={ref}
      suppressHydrationWarning
      className={`transition-shadow duration-600 ${done && started ? "drop-shadow-[0_0_24px_rgba(108,92,231,0.25)]" : ""}`}
    >
      {prefix}{format(display)}{suffix}
    </span>
  );
}
