"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import FocusTrap from "focus-trap-react";

const shortcuts = [
  { keys: "g h", label: "Go to home", path: "/" },
  { keys: "g s", label: "Go to services", path: "/services" },
  { keys: "g w", label: "Go to who we are", path: "/who-we-are" },
  { keys: "g i", label: "Go to insights", path: "/insights" },
  { keys: "g c", label: "Go to contact", path: "/contact" },
  { keys: "g p", label: "Go to how it works", path: "/how-it-works" },
];

const SKIP_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const [gPrefix, setGPrefix] = useState(false);
  const router = useRouter();
  const lastFocused = useRef<Element | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const closeModal = useCallback(() => {
    setOpen(false);
    if (lastFocused.current instanceof HTMLElement) {
      lastFocused.current.focus();
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Skip when typing in inputs or when modifier keys held
      const tag = (document.activeElement?.tagName || "").toUpperCase();
      if (SKIP_TAGS.has(tag)) return;
      if (document.activeElement?.getAttribute("contenteditable") === "true") return;
      if (document.activeElement?.getAttribute("role") === "textbox") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // ? opens modal
      if (e.key === "?" && e.shiftKey) {
        e.preventDefault();
        lastFocused.current = document.activeElement;
        setOpen(true);
        return;
      }

      // Esc closes modal
      if (e.key === "Escape" && open) {
        e.preventDefault();
        closeModal();
        return;
      }

      // g prefix
      if (e.key === "g" && !gPrefix) {
        setGPrefix(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setGPrefix(false), 1000);
        return;
      }

      // g + letter navigation
      if (gPrefix) {
        setGPrefix(false);
        clearTimeout(timerRef.current);
        const mapping: Record<string, string> = { h: "/", s: "/services", w: "/who-we-are", i: "/insights", c: "/contact", p: "/how-it-works" };
        const path = mapping[e.key];
        if (path) {
          e.preventDefault();
          router.push(path);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timerRef.current);
    };
  }, [gPrefix, open, router, closeModal]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={closeModal}
    >
      <FocusTrap>
        <div
          className="w-full max-w-[480px] rounded-2xl border border-border bg-bg-raised/95 p-8 backdrop-blur-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-18 font-semibold text-text-primary">Keyboard shortcuts</h2>
            <button onClick={closeModal} className="text-text-tertiary hover:text-text-primary" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="space-y-3">
            {shortcuts.map((s) => (
              <div key={s.keys} className="flex items-center justify-between py-1">
                <span className="text-14 text-text-secondary">{s.label}</span>
                <div className="flex gap-1">
                  {s.keys.split(" ").map((k) => (
                    <kbd key={k} className="rounded bg-bg-elevated px-2 py-0.5 font-mono text-12 text-text-primary border border-border">
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between py-1">
              <span className="text-14 text-text-secondary">Open this help</span>
              <kbd className="rounded bg-bg-elevated px-2 py-0.5 font-mono text-12 text-text-primary border border-border">?</kbd>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-14 text-text-secondary">Close</span>
              <kbd className="rounded bg-bg-elevated px-2 py-0.5 font-mono text-12 text-text-primary border border-border">Esc</kbd>
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
