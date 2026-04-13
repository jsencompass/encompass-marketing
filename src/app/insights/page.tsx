import type { Metadata } from "next";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Insights — Encompass Parking",
  description:
    "Quarterly notes from the Encompass principals on parking controllership, operator dynamics, revenue governance, and industry shifts.",
};

export default function Insights() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
      <p className="text-12 font-semibold uppercase tracking-widest text-accent">
        Insights
      </p>
      <h1 className="mt-4 text-48 font-semibold tracking-tight">Insights</h1>
      <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
        Quarterly notes from the Encompass principals on parking
        controllership, operator dynamics, revenue governance, and industry
        shifts. First edition coming soon.
      </p>

      <div className="mt-16 max-w-xl">
        <NewsletterSignup variant="inline" />
      </div>
    </section>
  );
}
