interface ContactAckProps {
  name: string;
}

export function contactAcknowledgement(p: ContactAckProps) {
  const subject = "We received your request | Encompass Parking";
  const firstName = p.name.trim().split(/\s+/)[0];

  const html = `
    <div style="max-width:580px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333;line-height:1.6;font-size:16px">
      <div style="height:8px;background:#6C5CE7;border-radius:4px 4px 0 0"></div>
      <div style="padding:32px 24px">
        <p>Hi ${firstName},</p>
        <p>Thanks for reaching out. We received your engagement request and a member of our team will reply within one business day.</p>
        <p>We review every inquiry personally. You\u2019ll hear from us with either a follow-up question to understand your portfolio better, or a proposed time to talk. We don\u2019t use auto-responders beyond this confirmation, and we don\u2019t sell, share, or syndicate your information.</p>
        <p><strong>A quick note on what to expect:</strong></p>
        <p>We work with institutional owners, management companies, municipalities, transit agencies, and self-operated portfolios. Our engagements begin with a Parking Performance Baseline (PPB), a paid onboarding that establishes what your parking asset can actually produce, where governance gaps exist, and what it takes to make the site controls-ready. From there, PACT Oversight runs monthly as a recurring controllership layer.</p>
        <p>If anything is time-sensitive, feel free to reply directly to this email.</p>
        <p>The Encompass Team</p>
      </div>
      <div style="border-top:1px solid #eee;padding:16px 24px">
        <p style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#71717A;margin:0">Encompass Parking, LLC \u00b7 Los Angeles</p>
        <p style="font-size:12px;color:#999;margin:8px 0 0">
          <a href="https://encompassparking.com" style="color:#999">encompassparking.com</a> \u00b7
          <a href="https://encompassparking.com/privacy" style="color:#999">Privacy Policy</a> \u00b7
          <a href="https://encompassparking.com/cookies" style="color:#999">Cookie Notice</a>
        </p>
      </div>
    </div>
  `;

  const text = `Hi ${firstName},

Thanks for reaching out. We received your engagement request and a member of our team will reply within one business day.

We review every inquiry personally. You'll hear from us with either a follow-up question to understand your portfolio better, or a proposed time to talk. We don't use auto-responders beyond this confirmation, and we don't sell, share, or syndicate your information.

A quick note on what to expect:

We work with institutional owners, management companies, municipalities, transit agencies, and self-operated portfolios. Our engagements begin with a Parking Performance Baseline (PPB), a paid onboarding that establishes what your parking asset can actually produce, where governance gaps exist, and what it takes to make the site controls-ready. From there, PACT Oversight runs monthly as a recurring controllership layer.

If anything is time-sensitive, feel free to reply directly to this email.

The Encompass Team

Encompass Parking, LLC · Los Angeles
encompassparking.com
Privacy: https://encompassparking.com/privacy
Cookies: https://encompassparking.com/cookies`;

  return { subject, html, text };
}
