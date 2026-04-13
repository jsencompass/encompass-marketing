"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

const links = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/services" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

export function Nav() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Interpolate between scrollY 40 and 120
  const t = useMemo(() => Math.min(1, Math.max(0, (scrollY - 40) / 80)), [scrollY]);
  const navHeight = lerp(80, 56, t);
  const wordmarkSize = lerp(18, 15, t);
  const bgOpacity = lerp(0, 0.85, t);
  const blurPx = lerp(0, 16, t);
  const borderOpacity = lerp(0, 1, t);

  return (
    <header
      className="sticky top-0 z-50 flex items-center"
      style={{
        height: `${navHeight}px`,
        backgroundColor: `rgba(10, 10, 11, ${bgOpacity})`,
        backdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : "none",
        borderBottom: `1px solid rgba(39, 39, 42, ${borderOpacity})`,
        transition: "none", // scroll-driven, not transition-driven
      }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-semibold tracking-tight text-text-primary"
          style={{ fontSize: `${wordmarkSize}px` }}
        >
          encompass
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-14 font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://encompass-ppb-web.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent bg-accent/10 px-4 py-1.5 text-14 font-medium text-accent-text transition-colors hover:bg-accent/20"
          >
            Member Portal
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`block h-0.5 w-5 bg-text-primary transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-text-primary transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-text-primary transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="absolute left-0 w-full border-b border-border bg-bg-base md:hidden"
          style={{ top: `${navHeight}px` }}
        >
          <nav className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-16 font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://encompass-ppb-web.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-fit rounded-full border border-accent bg-accent/10 px-4 py-1.5 text-14 font-medium text-accent-text transition-colors hover:bg-accent/20"
            >
              Member Portal
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
