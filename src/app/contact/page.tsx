"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const portfolioSizes = [
  "Select one",
  "1\u20135 sites",
  "6\u201325 sites",
  "26\u2013100 sites",
  "100+ sites",
];

// Metadata must be exported from a server component or layout;
// for client pages, set via parent layout or generateMetadata in a wrapper.

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const calUrl = process.env.NEXT_PUBLIC_CAL_EVENT_URL;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setFormError("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      organization: form.get("organization") as string,
      portfolioSize: form.get("portfolioSize") as string,
      phone: form.get("phone") as string,
      message: form.get("message") as string,
      website: form.get("website") as string, // honeypot
      turnstileToken: form.get("cf-turnstile-response") as string,
    };

    // Client-side validation
    const errors: Record<string, string> = {};
    if (!data.name.trim()) errors.name = "Name is required.";
    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Please enter a valid email address.";
    if (!data.message.trim()) errors.message = "Message is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus("success");
      } else {
        setFormError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setFormError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
        {/* ─── Left: Form ─── */}
        <Reveal>
        <div>
          <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
            Request an Engagement
          </p>
          <h1 className="mt-4 text-48 font-semibold tracking-tight">
            Tell us about your portfolio.
          </h1>
          <p className="mt-4 text-18 leading-relaxed text-text-secondary">
            We work with institutional owners, management companies,
            municipalities, transit agencies, and self-operated portfolios.
            Reply within one business day.
          </p>

          {status === "success" ? (
            <div className="mt-12 rounded-lg border border-status-revenue/30 bg-status-revenue/10 p-8">
              <p className="text-18 font-semibold text-text-primary">
                Thanks &mdash; we&rsquo;ll reply within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6" noValidate>
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="name" className="block text-14 font-medium text-text-primary">
                  Name <span className="text-status-loss">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  className="mt-2 w-full rounded-lg border border-border bg-bg-raised px-4 py-3 text-16 text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Your name"
                />
                {fieldErrors.name && (
                  <p id="name-error" className="mt-1 text-14 text-status-loss">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-14 font-medium text-text-primary">
                  Email <span className="text-status-loss">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className="mt-2 w-full rounded-lg border border-border bg-bg-raised px-4 py-3 text-16 text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="you@company.com"
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1 text-14 text-status-loss">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="organization" className="block text-14 font-medium text-text-primary">
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  className="mt-2 w-full rounded-lg border border-border bg-bg-raised px-4 py-3 text-16 text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Company or entity name"
                />
              </div>

              <div>
                <label htmlFor="portfolioSize" className="block text-14 font-medium text-text-primary">
                  Portfolio size
                </label>
                <select
                  id="portfolioSize"
                  name="portfolioSize"
                  className="mt-2 w-full rounded-lg border border-border bg-bg-raised px-4 py-3 text-16 text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  {portfolioSizes.map((s) => (
                    <option key={s} value={s === "Select one" ? "" : s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block text-14 font-medium text-text-primary">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-2 w-full rounded-lg border border-border bg-bg-raised px-4 py-3 text-16 text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="(555) 000-0000"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-14 font-medium text-text-primary">
                  Message <span className="text-status-loss">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  className="mt-2 w-full rounded-lg border border-border bg-bg-raised px-4 py-3 text-16 text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Tell us about your portfolio, current challenges, or what you're looking for."
                />
                {fieldErrors.message && (
                  <p id="message-error" className="mt-1 text-14 text-status-loss">{fieldErrors.message}</p>
                )}
              </div>

              {/* Turnstile widget placeholder — renders when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
              {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                <div
                  className="cf-turnstile"
                  data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  data-theme="dark"
                />
              )}

              {formError && (
                <p className="text-14 text-status-loss">{formError}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-full bg-accent px-8 py-3.5 text-16 font-semibold text-white transition-colors hover:bg-accent-dim disabled:opacity-50"
              >
                {status === "submitting" ? "Sending\u2026" : "Send message"}
              </button>

              <p className="text-12 text-text-tertiary">
                By submitting, you agree to our{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-text-secondary">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
        </Reveal>

        {/* ─── Right: Schedule ─── */}
        <Reveal delay={0.15}>
        <div id="schedule" className="scroll-mt-24">
          <h2 className="text-24 font-semibold text-text-primary">
            Prefer to schedule directly?
          </h2>

          {calUrl ? (
            <div className="mt-6 rounded-lg border border-border bg-bg-raised p-8">
              <p className="text-14 text-text-secondary">
                Book a 30-minute intro call with Jason Scott.
              </p>
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full border border-accent bg-accent/10 px-6 py-3 text-14 font-semibold text-accent-text transition-colors hover:bg-accent/20"
              >
                Schedule on Cal.com &rarr;
              </a>
              <p className="mt-3 text-14 italic text-text-tertiary">
                Note: Cal.com confirmation emails occasionally land in spam. If
                you don&rsquo;t see it within a few minutes of booking, check
                your junk folder.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-border bg-bg-raised p-8">
              <p className="text-14 text-text-tertiary">
                Scheduling URL pending. Cal.com setup in progress.
              </p>
            </div>
          )}

          <div className="mt-8">
            <p className="text-14 text-text-secondary">
              Or email{" "}
              <a
                href="mailto:contact@encompassparking.com"
                className="text-accent-text underline underline-offset-4"
              >
                contact@encompassparking.com
              </a>
            </p>
          </div>

          {/* ─── Insights Subscribe ─── */}
          <div className="mt-12">
            <h3 className="text-18 font-semibold text-text-primary">Insights</h3>
            <p className="mt-2 text-14 leading-relaxed text-text-secondary">
              What we see when we audit the numbers. Rate drift, validation leakage, operator incentive conflicts, PARCS tradeoffs, and the operating disciplines that keep NOI intact. Delivered quarterly to owners who want more than a month-end summary.
            </p>
            <div className="mt-4 max-w-[400px]">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
