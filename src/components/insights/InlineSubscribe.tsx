"use client";

import { useState, type FormEvent } from "react";

export function InlineSubscribe() {
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

  if (status === "success") {
    return <p className="text-14 text-accent-text">{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto">
      <input
        type="email"
        name="email"
        placeholder="you@company.com"
        required
        className="flex-1 bg-bg-raised border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent"
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-14 text-red-400 sm:col-span-2">{message}</p>
      )}
    </form>
  );
}
