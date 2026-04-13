import crypto from "crypto";

function verifyToken(token: string): { email: string } | null {
  const secret = process.env.NEWSLETTER_CONFIRM_SECRET;
  if (!secret) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payload, sig] = parts;
  const expectedSig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  if (sig !== expectedSig) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.email !== "string" || typeof data.exp !== "number") return null;
    if (Date.now() > data.exp) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}

async function confirmSubscription(email: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.NEWSLETTER_AUDIENCE_ID;
  if (!apiKey || !audienceId) return false;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.contacts.update({
      audienceId,
      id: email,
      unsubscribed: false,
    });
    return true;
  } catch (err) {
    console.error("[newsletter/confirm] Error:", err);
    return false;
  }
}

export default async function NewsletterConfirm({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <section className="mx-auto max-w-[800px] px-6 py-24 md:py-32 text-center">
        <h1 className="text-48 font-semibold tracking-tight">Invalid link</h1>
        <p className="mt-4 text-text-secondary">This confirmation link is missing or malformed.</p>
      </section>
    );
  }

  const result = verifyToken(token);
  if (!result) {
    return (
      <section className="mx-auto max-w-[800px] px-6 py-24 md:py-32 text-center">
        <h1 className="text-48 font-semibold tracking-tight">Link expired or invalid</h1>
        <p className="mt-4 text-text-secondary">
          This confirmation link has expired or is invalid. Please subscribe again.
        </p>
      </section>
    );
  }

  const success = await confirmSubscription(result.email);

  if (!success) {
    return (
      <section className="mx-auto max-w-[800px] px-6 py-24 md:py-32 text-center">
        <h1 className="text-48 font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-4 text-text-secondary">
          We couldn&rsquo;t confirm your subscription. Please try again or email contact@encompassparking.com.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[800px] px-6 py-24 md:py-32 text-center">
      <h1 className="text-48 font-semibold tracking-tight text-accent-text">You&rsquo;re subscribed.</h1>
      <p className="mt-4 text-18 text-text-secondary">
        Look for the first edition in your inbox. Quarterly notes on parking
        controllership, operator dynamics, and revenue governance.
      </p>
    </section>
  );
}
