interface ContactInternalProps {
  name: string;
  email: string;
  organization?: string;
  portfolioSize?: string;
  phone?: string;
  message: string;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function contactInternal(p: ContactInternalProps) {
  const org = p.organization?.trim() || "no organization";
  const size = p.portfolioSize?.trim() || "size not specified";
  const subject = `New engagement request — ${p.organization?.trim() || p.name.trim()}`;

  const previewLine = `New engagement request from ${p.name.trim()} (${org}) — ${size}`;

  const html = `
    <p style="color:#666;font-size:14px;margin:0 0 16px">${escapeHtml(previewLine)}</p>
    <h2 style="margin:0 0 16px">New engagement request</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px 0;color:#666">Name</td><td style="padding:8px 0">${escapeHtml(p.name.trim())}</td></tr>
      <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0">${escapeHtml(p.email.trim())}</td></tr>
      ${p.organization?.trim() ? `<tr><td style="padding:8px 0;color:#666">Organization</td><td style="padding:8px 0">${escapeHtml(p.organization.trim())}</td></tr>` : ""}
      ${p.portfolioSize?.trim() ? `<tr><td style="padding:8px 0;color:#666">Portfolio Size</td><td style="padding:8px 0">${escapeHtml(p.portfolioSize.trim())}</td></tr>` : ""}
      ${p.phone?.trim() ? `<tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0">${escapeHtml(p.phone.trim())}</td></tr>` : ""}
    </table>
    <h3 style="margin-top:24px">Message</h3>
    <p style="white-space:pre-wrap">${escapeHtml(p.message.trim())}</p>
  `;

  const text = `${previewLine}\n\nName: ${p.name.trim()}\nEmail: ${p.email.trim()}\n${p.organization?.trim() ? `Organization: ${p.organization.trim()}\n` : ""}${p.portfolioSize?.trim() ? `Portfolio Size: ${p.portfolioSize.trim()}\n` : ""}${p.phone?.trim() ? `Phone: ${p.phone.trim()}\n` : ""}\nMessage:\n${p.message.trim()}`;

  return { subject, html, text };
}
