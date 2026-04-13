import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function signToken(email: string): string {
  const secret = process.env.NEWSLETTER_CONFIRM_SECRET;
  if (!secret) throw new Error("NEWSLETTER_CONFIRM_SECRET not set");
  const exp = Date.now() + 7 * 24 * 3600_000; // 7 days
  const payload = Buffer.from(JSON.stringify({ email, exp })).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.NEWSLETTER_AUDIENCE_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !audienceId || !fromEmail) {
    console.error("[newsletter] Missing configuration env vars");
    return NextResponse.json(
      { ok: false, error: "Newsletter service not configured yet." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    // Add contact to audience as unsubscribed (pending confirmation)
    await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: true,
    });

    // Generate confirmation token
    const token = signToken(email);
    const confirmUrl = `https://encompassparking.com/newsletter/confirm?token=${token}`;

    // Send confirmation email
    await resend.emails.send({
      from: `Encompass Parking <${fromEmail}>`,
      to: [email],
      subject: "Confirm your subscription — Encompass Parking",
      html: `
        <h2>Confirm your subscription</h2>
        <p>You requested to subscribe to Encompass Parking insights — quarterly notes on parking controllership, operator dynamics, and revenue governance.</p>
        <p><a href="${confirmUrl}" style="display:inline-block;padding:12px 24px;background:#6C5CE7;color:white;text-decoration:none;border-radius:24px;font-weight:600">Confirm subscription</a></p>
        <p style="color:#666;font-size:14px;margin-top:24px">If you didn't request this, you can safely ignore this email. This link expires in 7 days.</p>
      `,
      text: `Confirm your subscription to Encompass Parking insights.\n\nClick here to confirm: ${confirmUrl}\n\nIf you didn't request this, you can safely ignore this email. This link expires in 7 days.`,
    });

    console.log("[newsletter] Confirmation email sent");
    return NextResponse.json({ ok: true, message: "Check your inbox to confirm." });
  } catch (err) {
    console.error("[newsletter] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
