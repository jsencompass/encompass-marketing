"use client";

import { useState, useRef, useId } from "react";

export function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <span className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((p) => !p)}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-bg-elevated text-12 text-text-tertiary transition-colors hover:bg-accent/20 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
      >
        ?
      </button>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute left-1/2 bottom-full z-50 mb-2 w-56 -translate-x-1/2 rounded-lg border border-border bg-bg-elevated px-3 py-2 text-12 leading-relaxed text-text-secondary shadow-xl"
        >
          {text}
        </span>
      )}
    </span>
  );
}
