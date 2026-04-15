{/* Legal review recommended before customer-facing launch; current copy reflects conservative defaults per Session 7. */}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Encompass Parking",
  description:
    "Privacy Policy for Encompass Parking, LLC. Learn how we collect, use, and protect your information.",
};

export default function Privacy() {
  return (
    <article className="mx-auto max-w-[800px] px-6 py-24 md:py-32">
      <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
        Legal
      </p>
      <h1 className="mt-4 text-48 font-semibold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-4 text-14 text-text-tertiary">
        Last Updated: April 2026
      </p>

      <div className="mt-12 space-y-10 text-16 leading-relaxed text-text-secondary">
        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Information We Collect
          </h2>
          <p className="mt-4">
            Encompass Parking, LLC (&ldquo;Encompass,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website
            encompassparking.com (the &ldquo;Site&rdquo;). We collect
            information in the following ways:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text-primary">
                Information you provide directly:
              </strong>{" "}
              When you contact us through the Site, submit a form, or
              correspond with us via email, you may provide your name, email
              address, phone number, company name, and details about your
              inquiry.
            </li>
            <li>
              <strong className="text-text-primary">
                Automatically collected information:
              </strong>{" "}
              We use Vercel Analytics, a privacy-first, cookieless analytics
              service. Vercel Analytics does not use cookies, does not collect
              personal data, does not track users across sites, and anonymizes
              IP addresses. We collect aggregate data including page views,
              referrer URLs, general geographic region (country/state level),
              device type, and browser type.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            How We Use Information
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>To respond to your inquiries and provide requested services</li>
            <li>
              To improve the Site&rsquo;s content, functionality, and user
              experience based on aggregate analytics
            </li>
            <li>To comply with legal obligations</li>
            <li>
              To protect the rights, property, or safety of Encompass, our
              users, or the public
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            How We Share Information
          </h2>
          <p className="mt-4">
            We do not sell, rent, or trade your personal information. We may
            share information in the following limited circumstances:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text-primary">Service providers:</strong>{" "}
              We use Vercel for hosting and analytics. Vercel processes data as
              a service provider on our behalf and does not use it for their
              own purposes.
            </li>
            <li>
              <strong className="text-text-primary">Legal requirements:</strong>{" "}
              We may disclose information if required by law, subpoena, or
              other legal process, or if we believe disclosure is necessary to
              protect our rights or the safety of others.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Third-Party Services
          </h2>
          <p className="mt-4">
            The Site uses the following third-party services, each of which may
            process limited data on our behalf:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text-primary">Vercel</strong> (US-based,
              SOC 2 Type II compliant). Hosting, serverless functions,
              and cookieless analytics. May process IP addresses for security,
              CDN routing, and abuse prevention.
            </li>
            <li>
              <strong className="text-text-primary">Resend</strong> (US-based).
              Transactional email delivery for contact form
              submissions and newsletter communications. Processes email
              addresses you provide when you submit a form or subscribe.
            </li>
            <li>
              <strong className="text-text-primary">
                Cloudflare Turnstile
              </strong>{" "}
              (US-based). Spam protection on our contact form. Does not
              set cookies or collect personal data beyond IP address for
              challenge verification. IP addresses are processed only for the
              duration of the challenge.
            </li>
          </ul>
          <p className="mt-4">
            Each third party processes data in accordance with their own
            privacy policies. We select processors that maintain appropriate
            security and privacy standards and process data only as necessary
            to deliver their services.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Your California Privacy Rights
          </h2>
          <p className="mt-4">
            If you are a California resident, the California Consumer Privacy
            Act (CCPA) and the California Privacy Rights Act (CPRA) provide you
            with specific rights regarding your personal information:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text-primary">Right to know:</strong> You
              have the right to request that we disclose what personal
              information we collect, use, disclose, and sell about you.
            </li>
            <li>
              <strong className="text-text-primary">Right to delete:</strong>{" "}
              You have the right to request deletion of personal information we
              have collected from you, subject to certain exceptions.
            </li>
            <li>
              <strong className="text-text-primary">Right to correct:</strong>{" "}
              You have the right to request correction of inaccurate personal
              information.
            </li>
            <li>
              <strong className="text-text-primary">
                Right to limit use and disclosure of sensitive personal
                information:
              </strong>{" "}
              We do not collect sensitive personal information as defined under
              the CPRA.
            </li>
            <li>
              <strong className="text-text-primary">
                Right to opt out of sale or sharing:
              </strong>{" "}
              We do not sell or share your personal information as defined
              under the CCPA/CPRA. You may still exercise this right by using
              the &ldquo;Do Not Sell or Share My Personal Information&rdquo;
              link in the footer of our Site or adjusting your preferences in
              our consent banner.
            </li>
            <li>
              <strong className="text-text-primary">
                Right to non-discrimination:
              </strong>{" "}
              We will not discriminate against you for exercising any of your
              CCPA/CPRA rights.
            </li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:legal@encompassparking.com"
              className="text-accent-text underline underline-offset-4"
            >
              legal@encompassparking.com
            </a>
            . We will verify your identity before processing your request and
            respond within 45 days as required by law.
          </p>
          <p className="mt-4">
            To verify your identity when you submit a request to know, delete,
            correct, limit, or opt out of sale or sharing, we may ask you to
            provide information that matches what we already hold (such as the
            email address you used on a form). For requests of a sensitive
            nature, we may require additional verification. We do not ask for
            sensitive personal information (such as a government-issued ID)
            unless strictly necessary.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Do Not Sell or Share My Personal Information
          </h2>
          <p className="mt-4">
            Encompass does not sell or share your personal information as those
            terms are defined under the CCPA/CPRA. We use Vercel Analytics,
            which is privacy-first and does not use cookies or track users
            across sites. Vercel Analytics does not constitute
            &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal
            information under the CPRA because the data does not identify
            individual visitors and is not used for cross-context behavioral
            advertising.
          </p>
          <p className="mt-4">
            California residents retain the right to opt out of any future use
            of personal information for sale or sharing, and can do so via the
            &ldquo;Do Not Sell or Share My Personal Information&rdquo; link in
            our footer, or by using a browser with Global Privacy Control (GPC)
            enabled, which we honor automatically.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Data Retention
          </h2>
          <p className="mt-4">
            We retain personal information you provide (such as contact form
            submissions) for as long as necessary to fulfill the purposes for
            which it was collected, to comply with legal obligations, resolve
            disputes, and enforce our agreements. Aggregate analytics data
            collected by Vercel Analytics is retained according to
            Vercel&rsquo;s data retention policies and cannot be used to
            identify individual users.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">Security</h2>
          <p className="mt-4">
            We implement administrative, technical, and organizational measures
            designed to protect personal information, including: HTTPS/TLS
            encryption for all site traffic; HTTP security headers (Content
            Security Policy, Strict Transport Security, X-Frame-Options, and
            others) to reduce common web attack vectors; principle-of-least-privilege
            access controls for our staff; and regular review of our
            third-party processors&rsquo; security posture. No method of
            electronic transmission or storage is fully secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Children&rsquo;s Privacy
          </h2>
          <p className="mt-4">
            The Site is not directed to individuals under the age of 16. We do
            not knowingly collect personal information from children under 16.
            If we learn that we have collected personal information from a
            child under 16, we will take steps to delete that information
            promptly. If you believe we have collected information from a child
            under 16, please contact us at{" "}
            <a
              href="mailto:legal@encompassparking.com"
              className="text-accent-text underline underline-offset-4"
            >
              legal@encompassparking.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Changes to This Policy
          </h2>
          <p className="mt-4">
            We may update this Privacy Policy from time to time. When we make
            material changes, we will update the &ldquo;Last Updated&rdquo;
            date at the top of this page. We encourage you to review this
            Privacy Policy periodically for any changes. Your continued use of
            the Site after changes are posted constitutes your acceptance of
            the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">Contact</h2>
          <p className="mt-4">
            If you have questions about this Privacy Policy or wish to exercise
            your California privacy rights, please contact us at:
          </p>
          <address className="mt-4 not-italic">
            <p>Encompass Parking, LLC</p>
            <p>Attn: Privacy Officer</p>
            <p>1401 21st St, Ste R</p>
            <p>Sacramento, CA 95811</p>
            <p>
              <a
                href="mailto:legal@encompassparking.com"
                className="text-accent-text underline underline-offset-4"
              >
                legal@encompassparking.com
              </a>
            </p>
          </address>
        </section>
      </div>
    </article>
  );
}
