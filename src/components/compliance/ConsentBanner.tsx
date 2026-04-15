"use client";

import { useSyncExternalStore, useCallback, useEffect, useRef, useState } from "react";

const CONSENT_KEY = "encompass-consent";

export type ConsentState = "accepted" | "denied" | "pending";

let listeners: Array<() => void> = [];
function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners = [...listeners, callback];
  return () => { listeners = listeners.filter((l) => l !== callback); };
}

function getSnapshot(): ConsentState {
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted" || stored === "denied") return stored;
  return "pending";
}

function getServerSnapshot(): ConsentState {
  // Return non-pending so the banner never renders in SSR HTML.
  // Client hydration calls getSnapshot() which returns the real state.
  // This prevents the flash-then-dismiss for returning users whose
  // localStorage already has a consent decision.
  return "denied";
}

export function useConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    emitChange();
  }, []);

  const deny = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "denied");
    emitChange();
  }, []);

  const reopen = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    emitChange();
  }, []);

  return { consent, accept, deny, reopen };
}

export function ConsentBanner() {
  const { consent, accept, deny } = useConsent();
  const gpcHandled = useRef(false);
  const [ready, setReady] = useState(false);

  // Handle GPC detection as a side effect (not inside getSnapshot).
  // Use a ref to gate the first render and a single setState via
  // requestAnimationFrame to satisfy react-hooks/set-state-in-effect.
  useEffect(() => {
    if (!gpcHandled.current) {
      gpcHandled.current = true;
      if (
        typeof navigator !== "undefined" &&
        (navigator as Navigator & { globalPrivacyControl?: boolean })
          .globalPrivacyControl === true
      ) {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored !== "denied") {
          localStorage.setItem(CONSENT_KEY, "denied");
          emitChange();
          console.log("[Encompass] Global Privacy Control detected; analytics opted out automatically.");
        }
      }
    }
    requestAnimationFrame(() => setReady(true));
  }, []);

  if (!ready || consent !== "pending") return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-bg-elevated p-6 shadow-2xl">
      <p className="text-14 leading-relaxed text-text-secondary">
        We use privacy-first analytics (no cookies, no cross-site tracking) to
        understand how visitors use our site. California residents have the
        right to opt out.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={accept}
          className="rounded-full bg-accent px-4 py-2 text-14 font-medium text-white transition-colors hover:bg-accent-dim"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={deny}
          className="rounded-full border border-border px-4 py-2 text-14 font-medium text-text-secondary transition-colors hover:border-text-tertiary hover:text-text-primary"
        >
          Opt out
        </button>
      </div>
    </div>
  );
}
