"use client";

import { useState, type FormEvent } from "react";

export function NewsletterSignup({ variant = "footer" }: { variant?: "footer" | "inline" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = (form.get("email") as string)?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (json.ok) {
        setMessage(json.message || "Check your inbox to confirm.");
        setStatus("success");
      } else {
        setMessage(json.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (variant === "inline") {
    return (
      <div className="rounded-lg border border-border bg-bg-raised p-8">
        <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
          Stay Updated
        </p>
        <h3 className="mt-4 text-24 font-semibold text-text-primary">
          Quarterly notes on parking controllership.
        </h3>
        <p className="mt-2 text-14 leading-relaxed text-text-secondary">
          What we&rsquo;re seeing across portfolios &mdash; operator incentive
          conflicts, validation drift, PARCS tradeoffs. No spam. Unsubscribe
          anytime.
        </p>
        {status === "success" ? (
          <p className="mt-6 text-14 text-accent-text">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-lg border border-border bg-bg-base px-4 py-3 text-14 text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-accent px-6 py-3 text-14 font-semibold text-white transition-colors hover:bg-accent-dim disabled:opacity-50"
            >
              {status === "submitting" ? "…" : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-14 text-status-loss">{message}</p>
        )}
      </div>
    );
  }

  // Footer variant
  return (
    <div>
      <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
        Insights
      </p>
      <h3 className="mt-3 text-18 font-semibold text-text-primary">
        Quarterly notes on parking controllership.
      </h3>
      <p className="mt-2 text-14 leading-relaxed text-text-secondary">
        What we&rsquo;re seeing across portfolios &mdash; operator incentive
        conflicts, validation drift, PARCS tradeoffs. No spam. Unsubscribe
        anytime.
      </p>
      {status === "success" ? (
        <p className="mt-4 text-14 text-accent-text">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            className="flex-1 rounded-lg border border-border bg-bg-raised px-4 py-2.5 text-14 text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full bg-accent px-5 py-2.5 text-14 font-semibold text-white transition-colors hover:bg-accent-dim disabled:opacity-50"
          >
            {status === "submitting" ? "…" : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-2 text-14 text-status-loss">{message}</p>
      )}
    </div>
  );
}
