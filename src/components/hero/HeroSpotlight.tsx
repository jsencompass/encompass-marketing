"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function HeroSpotlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        el.style.setProperty("--glow-opacity", "1");
      });
    };
    const onLeave = () => {
      el.style.setProperty("--glow-opacity", "0");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={ref} className="hero-spotlight relative overflow-hidden">
      {children}
    </div>
  );
}
