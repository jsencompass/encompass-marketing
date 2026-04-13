"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/services" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-16 border-b border-border flex items-center transition-colors duration-200 ${
        scrolled ? "bg-bg-base/80 backdrop-blur-md" : "bg-bg-base"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6">
        {/* Wordmark */}
        <Link href="/" className="text-18 font-semibold tracking-tight text-text-primary">
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
            className="rounded-full border border-accent bg-accent/10 px-4 py-1.5 text-14 font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Member Portal
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-text-primary transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-text-primary transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-text-primary transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute left-0 top-16 w-full border-b border-border bg-bg-base md:hidden">
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
              className="mt-2 w-fit rounded-full border border-accent bg-accent/10 px-4 py-1.5 text-14 font-medium text-accent transition-colors hover:bg-accent/20"
            >
              Member Portal
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
