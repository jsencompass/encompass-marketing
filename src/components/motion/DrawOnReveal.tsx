"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function DrawOnReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // Find all paths/circles/rects/lines within the SVG
    const strokes = el.querySelectorAll<SVGGeometryElement>("path, circle, rect, line");
    strokes.forEach((stroke) => {
      const length = stroke.getTotalLength ? stroke.getTotalLength() : 100;
      stroke.style.strokeDasharray = `${length}`;
      stroke.style.strokeDashoffset = `${length}`;
      stroke.style.transition = `stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, fill-opacity 400ms ease-out ${delay + 0.6}s`;
      stroke.style.fillOpacity = "0";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          strokes.forEach((stroke) => {
            stroke.style.strokeDashoffset = "0";
            stroke.style.fillOpacity = "1";
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, delay]);

  return <div ref={ref}>{children}</div>;
}
