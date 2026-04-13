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
    if (typeof data.email !== "string") return null;
    // No expiry check for unsubscribe — always allow
    return { email: data.email };
  } catch {
    return null;
  }
}

async function unsubscribeContact(email: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.NEWSLETTER_AUDIENCE_ID;
  if (!apiKey || !audienceId) return false;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.contacts.update({
      audienceId,
      id: email,
      unsubscribed: true,
    });
    return true;
  } catch (err) {
    console.error("[newsletter/unsubscribe] Error:", err);
    return false;
  }
}

export default async function NewsletterUnsubscribe({
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
        <p className="mt-4 text-text-secondary">This unsubscribe link is missing or malformed.</p>
      </section>
    );
  }

  const result = verifyToken(token);
  if (!result) {
    return (
      <section className="mx-auto max-w-[800px] px-6 py-24 md:py-32 text-center">
        <h1 className="text-48 font-semibold tracking-tight">Invalid link</h1>
        <p className="mt-4 text-text-secondary">
          This unsubscribe link is invalid. Please email contact@encompassparking.com to manage your subscription.
        </p>
      </section>
    );
  }

  const success = await unsubscribeContact(result.email);

  return (
    <section className="mx-auto max-w-[800px] px-6 py-24 md:py-32 text-center">
      <h1 className="text-48 font-semibold tracking-tight">
        {success ? "Unsubscribed" : "Something went wrong"}
      </h1>
      <p className="mt-4 text-text-secondary">
        {success
          ? "You\u2019ve been unsubscribed from Encompass Parking insights. You can re-subscribe anytime from our website."
          : "We couldn\u2019t process your unsubscribe request. Please email contact@encompassparking.com."}
      </p>
    </section>
  );
}
