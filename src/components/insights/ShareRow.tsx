"use client";

import { useState } from "react";

export function ShareRow({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://encompassparking.com${url}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttons = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`, icon: <path d="M4 4l5.5 6L4 16h1.5l4.5-5 3.5 5H18l-5.5-6.5L18 4h-1.5L12.5 9 9.5 4H4z" /> },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`, icon: <path d="M5 7h2v10H5V7zm1-4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM9 7h2v1.5c.5-.9 1.5-1.7 3-1.7 2.5 0 3 1.7 3 3.7V17h-2v-6c0-1.2-.5-2-1.5-2s-2.5.8-2.5 2.2V17H9V7z" /> },
    { label: "Share via email", href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(fullUrl)}`, icon: <path d="M4 6l8 5 8-5M4 6v10h16V6H4z" strokeWidth="1.5" fill="none" stroke="currentColor" /> },
  ];

  return (
    <div className="flex items-center justify-between border-t border-border pt-6">
      <p className="text-14 text-text-secondary">Share this post</p>
      <div className="flex gap-2">
        {buttons.map((b) => (
          <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" aria-label={b.label} className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-bg-raised text-text-secondary transition-colors hover:border-accent hover:text-text-primary">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">{b.icon}</svg>
          </a>
        ))}
        <button onClick={copyLink} aria-label="Copy link" className="relative flex h-10 w-10 items-center justify-center rounded-md border border-border bg-bg-raised text-text-secondary transition-colors hover:border-accent hover:text-text-primary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 12l4-4M7 9l-2 2a3 3 0 004 4l2-2M13 11l2-2a3 3 0 00-4-4l-2 2" strokeLinecap="round" /></svg>
          {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-accent px-2 py-1 text-12 text-white">Copied!</span>}
        </button>
      </div>
    </div>
  );
}
