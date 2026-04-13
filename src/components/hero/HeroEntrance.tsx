"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { duration, ease, stagger as staggerTokens } from "@/lib/motion/tokens";
import type { ReactNode } from "react";

export function HeroEntrance({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <div className="hero-stagger-motion">
      {children}
    </div>
  );
}

export function HeroEyebrow({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.p
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.base, ease: ease.standard as [number, number, number, number] }}
      className="text-12 font-semibold uppercase tracking-widest text-accent-text"
    >
      {children}
    </motion.p>
  );
}

export function HeroTitle({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.h1
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.slow, ease: ease.standard as [number, number, number, number], delay: 0.15 }}
      className="mt-4 max-w-3xl text-48 font-semibold leading-tight tracking-tight md:text-64 md:leading-[1.1]"
    >
      {children}
    </motion.h1>
  );
}

export function HeroSubhead({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.p
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.slow, ease: ease.gentle as [number, number, number, number], delay: 0.6 }}
      className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary"
    >
      {children}
    </motion.p>
  );
}

export function HeroCTAs({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: ease.spring as [number, number, number, number], delay: 0.8 }}
      className="mt-10 flex flex-wrap items-center gap-4"
    >
      {children}
    </motion.div>
  );
}
