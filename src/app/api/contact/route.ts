import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";
import { contactInternal } from "@/lib/email/templates/contactInternal";
import { contactAcknowledgement } from "@/lib/email/templates/contactAcknowledgement";

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const { allowed, resetAt } = await rateLimit({ key: `contact:${ip}`, limit: 3, windowSeconds: 3600 });
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later.", resetAt: resetAt.toISOString() },
      { status: 429 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    organization?: string;
    portfolioSize?: string;
    phone?: string;
    message?: string;
    website?: string;
    turnstileToken?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  // Validate
  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json({ ok: false, error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  // Turnstile
  if (body.turnstileToken) {
    const valid = await verifyTurnstile(body.turnstileToken, ip);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Spam verification failed. Please try again." }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("[contact] Missing email configuration env vars");
    return NextResponse.json(
      { ok: false, error: "Email service not configured. Please email contact@encompassparking.com directly." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const internalTemplate = contactInternal({
    name: body.name.trim(),
    email: body.email.trim(),
    organization: body.organization,
    portfolioSize: body.portfolioSize,
    phone: body.phone,
    message: body.message.trim(),
  });
  const ackTemplate = contactAcknowledgement({ name: body.name.trim() });

  let internalOk = false;
  let ackOk = false;

  // Send internal notification
  try {
    await resend.emails.send({
      from: `Encompass Web <${fromEmail}>`,
      to: [toEmail],
      replyTo: body.email.trim(),
      subject: internalTemplate.subject,
      html: internalTemplate.html,
      text: internalTemplate.text,
    });
    internalOk = true;
  } catch (err) {
    console.error("[contact] Internal email failed:", (err as Error).message);
  }

  // Send acknowledgement to submitter
  try {
    await resend.emails.send({
      from: `Encompass <${fromEmail}>`,
      to: [body.email.trim()],
      replyTo: toEmail,
      subject: ackTemplate.subject,
      html: ackTemplate.html,
      text: ackTemplate.text,
    });
    ackOk = true;
  } catch (err) {
    console.error("[contact] Acknowledgement email failed:", JSON.stringify({ email: "[REDACTED]", error: (err as Error).message }));
  }

  if (!internalOk && !ackOk) {
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please email contact@encompassparking.com directly." },
      { status: 500 }
    );
  }

  if (!ackOk) {
    console.warn("[contact] Internal delivered but acknowledgement failed — user sees success");
  }

  console.log(`[contact] Submission from ${body.organization?.trim() || "individual"} — internal:${internalOk} ack:${ackOk}`);
  return NextResponse.json({ ok: true });
}
