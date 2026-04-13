import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Skip verification if not configured

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

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
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

  // Honeypot check
  if (body.website) {
    return NextResponse.json({ ok: true }); // Silent success for bots
  }

  // Validate required fields
  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Verify Turnstile
  if (body.turnstileToken) {
    const valid = await verifyTurnstile(body.turnstileToken, ip);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Spam verification failed. Please try again." },
        { status: 400 }
      );
    }
  }

  // Send via Resend
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
  const subject = `New engagement request — ${body.organization?.trim() || body.name.trim()}`;

  try {
    await resend.emails.send({
      from: `Encompass Web <${fromEmail}>`,
      to: [toEmail],
      replyTo: body.email.trim(),
      subject,
      html: `
        <h2>New engagement request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px 0;color:#666">Name</td><td style="padding:8px 0">${escapeHtml(body.name.trim())}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0">${escapeHtml(body.email.trim())}</td></tr>
          ${body.organization?.trim() ? `<tr><td style="padding:8px 0;color:#666">Organization</td><td style="padding:8px 0">${escapeHtml(body.organization.trim())}</td></tr>` : ""}
          ${body.portfolioSize?.trim() ? `<tr><td style="padding:8px 0;color:#666">Portfolio Size</td><td style="padding:8px 0">${escapeHtml(body.portfolioSize.trim())}</td></tr>` : ""}
          ${body.phone?.trim() ? `<tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0">${escapeHtml(body.phone.trim())}</td></tr>` : ""}
        </table>
        <h3 style="margin-top:24px">Message</h3>
        <p style="white-space:pre-wrap">${escapeHtml(body.message.trim())}</p>
      `,
      text: `New engagement request\n\nName: ${body.name.trim()}\nEmail: ${body.email.trim()}\n${body.organization?.trim() ? `Organization: ${body.organization.trim()}\n` : ""}${body.portfolioSize?.trim() ? `Portfolio Size: ${body.portfolioSize.trim()}\n` : ""}${body.phone?.trim() ? `Phone: ${body.phone.trim()}\n` : ""}\nMessage:\n${body.message.trim()}`,
    });

    // Log submission (no PII in production logs)
    console.log(`[contact] Submission received from ${body.organization?.trim() || "individual"}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please email contact@encompassparking.com directly." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
