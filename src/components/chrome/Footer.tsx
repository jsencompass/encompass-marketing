"use client";

import Link from "next/link";
import { useConsent } from "@/components/compliance/ConsentBanner";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Services", href: "/services" },
      { label: "Member Portal", href: "https://encompass-ppb-web.vercel.app" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Request an Engagement", href: "/contact" },
      { label: "Book an Intro Call", href: "/contact#schedule" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Cookie & Tracking Notice", href: "/cookies" },
    ],
  },
];

export function Footer() {
  const { reopen } = useConsent();

  return (
    <footer className="border-t border-border bg-bg-base">
      {/* Newsletter row */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <NewsletterSignup variant="footer" />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
              {col.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((l) => {
                const isExternal = l.href.startsWith("http");
                return (
                  <li key={l.label}>
                    {isExternal ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center text-14 text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="inline-flex min-h-[44px] items-center text-14 text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-6">
          <p className="text-12 text-text-tertiary">
            &copy; {new Date().getFullYear()} Encompass Parking, LLC. All
            rights reserved.
            <span className="ml-4 hidden lg:inline">Press <kbd className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[11px] border border-border">?</kbd> for keyboard shortcuts.</span>
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                reopen();
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }}
              className="text-12 text-text-tertiary underline underline-offset-4 transition-colors hover:text-text-secondary"
            >
              Do Not Sell or Share My Personal Information
            </button>
            <span className="text-12 text-text-tertiary">·</span>
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
              Encompass Parking, LLC &middot; Los Angeles
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
