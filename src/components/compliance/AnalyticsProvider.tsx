"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useConsent } from "./ConsentBanner";

export function AnalyticsProvider() {
  const { consent } = useConsent();

  if (consent !== "accepted") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
