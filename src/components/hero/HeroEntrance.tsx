"use client";

import type { ReactNode } from "react";

export function HeroEntrance({ children }: { children: ReactNode }) {
  return (
    <div className="hero-stagger">
      {children}
    </div>
  );
}

export function HeroEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
      {children}
    </p>
  );
}

export function HeroTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="mt-4 max-w-3xl text-48 font-semibold leading-tight tracking-tight md:text-64 md:leading-[1.1]">
      {children}
    </h1>
  );
}

export function HeroSubhead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
      {children}
    </p>
  );
}

export function HeroCTAs({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      {children}
    </div>
  );
}
