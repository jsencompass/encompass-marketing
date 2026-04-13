"use client";

import { useState, useEffect, useCallback } from "react";

const CONSENT_KEY = "encompass-consent";

export type ConsentState = "accepted" | "denied" | "pending";

export function useConsent() {
  const [consent, setConsentState] = useState<ConsentState>("pending");

  useEffect(() => {
    // Honor Global Privacy Control
    if (
      typeof navigator !== "undefined" &&
      (navigator as Navigator & { globalPrivacyControl?: boolean })
        .globalPrivacyControl === true
    ) {
      localStorage.setItem(CONSENT_KEY, "denied");
      setConsentState("denied");
      console.log(
        "[Encompass] Global Privacy Control detected — analytics opted out automatically."
      );
      return;
    }

    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "denied") {
      setConsentState(stored);
    }
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsentState("accepted");
  }, []);

  const deny = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "denied");
    setConsentState("denied");
  }, []);

  const reopen = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    setConsentState("pending");
  }, []);

  return { consent, accept, deny, reopen };
}

export function ConsentBanner() {
  const { consent, accept, deny } = useConsent();

  if (consent !== "pending") return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-bg-elevated p-6 shadow-2xl">
      <p className="text-14 leading-relaxed text-text-secondary">
        We use privacy-first analytics (no cookies, no cross-site tracking) to
        understand how visitors use our site. California residents have the
        right to opt out.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={accept}
          className="rounded-full bg-accent px-4 py-2 text-14 font-medium text-white transition-colors hover:bg-accent-dim"
        >
          Accept
        </button>
        <button
          onClick={deny}
          className="rounded-full border border-border px-4 py-2 text-14 font-medium text-text-secondary transition-colors hover:border-text-tertiary hover:text-text-primary"
        >
          Opt out
        </button>
      </div>
    </div>
  );
}
