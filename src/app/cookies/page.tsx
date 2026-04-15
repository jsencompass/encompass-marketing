{/* Legal review recommended before customer-facing launch; current copy reflects conservative defaults per Session 7. */}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie & Tracking Notice | Encompass Parking",
  description:
    "How Encompass Parking uses analytics and tracking on its website. We use cookieless, privacy-first analytics.",
};

export default function Cookies() {
  return (
    <article className="mx-auto max-w-[800px] px-6 py-24 md:py-32">
      <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
        Legal
      </p>
      <h1 className="mt-4 text-48 font-semibold tracking-tight">
        Cookie &amp; Tracking Notice
      </h1>
      <p className="mt-4 text-14 text-text-tertiary">
        Last Updated: April 2026
      </p>

      <div className="mt-12 space-y-10 text-16 leading-relaxed text-text-secondary">
        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Our Approach to Analytics
          </h2>
          <p className="mt-4">
            Encompass Parking uses Vercel Analytics, a privacy-first analytics
            service, to understand how visitors use our website. Vercel
            Analytics is fundamentally different from traditional analytics
            platforms:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text-primary">No cookies:</strong> Vercel
              Analytics does not set or read any cookies on your device.
            </li>
            <li>
              <strong className="text-text-primary">No personal data:</strong>{" "}
              IP addresses are anonymized. No personally identifiable
              information is collected or stored.
            </li>
            <li>
              <strong className="text-text-primary">
                No cross-site tracking:
              </strong>{" "}
              Your activity on our site is not linked to your activity on any
              other website.
            </li>
            <li>
              <strong className="text-text-primary">
                No data sold or shared:
              </strong>{" "}
              Analytics data is used solely by Encompass to improve the Site
              and is not sold, shared, or used for advertising purposes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            What We Collect
          </h2>
          <p className="mt-4">
            At an aggregate level, Vercel Analytics collects the following
            non-personal data:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Page views and navigation paths</li>
            <li>Referrer URLs (where you came from)</li>
            <li>
              General geographic region (country and state level, not precise
              location)
            </li>
            <li>Device type (desktop, mobile, tablet)</li>
            <li>Browser type and version</li>
            <li>
              Web Vitals performance metrics (page load time, interaction
              responsiveness)
            </li>
          </ul>
          <p className="mt-4">
            This data cannot be used to identify you as an individual and is
            analyzed only in aggregate to understand overall site usage
            patterns.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            First-Party Storage
          </h2>
          <p className="mt-4">
            The Site uses browser localStorage (not cookies) to store your
            analytics consent preference. This data:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Is stored only on your device and is never sent to our servers</li>
            <li>Contains only your consent choice (&ldquo;accepted&rdquo; or &ldquo;denied&rdquo;)</li>
            <li>Can be cleared at any time by clearing your browser&rsquo;s local storage</li>
          </ul>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Your Right to Opt Out
          </h2>
          <p className="mt-4">
            Even though our analytics are cookieless and do not collect
            personal data, we respect your right to opt out entirely:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text-primary">Consent banner:</strong>{" "}
              On your first visit, you can choose to accept or opt out of
              analytics. Your choice is saved in localStorage.
            </li>
            <li>
              <strong className="text-text-primary">Footer link:</strong> You
              can change your preference at any time by clicking &ldquo;Do Not
              Sell or Share My Personal Information&rdquo; in the footer of any
              page.
            </li>
            <li>
              <strong className="text-text-primary">
                Global Privacy Control (GPC):
              </strong>{" "}
              If your browser sends a GPC signal
              (navigator.globalPrivacyControl), we honor it automatically and
              do not load analytics. No action is required on your part.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            California Residents
          </h2>
          <p className="mt-4">
            Under the California Consumer Privacy Act (CCPA) and the California
            Privacy Rights Act (CPRA), you have the right to opt out of the
            &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of your personal
            information. Encompass does not sell or share personal information.
            Our cookieless analytics do not constitute a sale or sharing under
            California law. Nevertheless, we provide the opt-out mechanisms
            described above as an additional privacy safeguard.
          </p>
          <p className="mt-4">
            For more information about your California privacy rights, please
            see our{" "}
            <a
              href="/privacy"
              className="text-accent-text underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Third-Party Content
          </h2>
          <p className="mt-4">
            The Site does not embed third-party advertising, social media
            widgets, or tracking pixels. External links (such as the Member
            Portal) open in a new tab and are governed by their own privacy
            policies.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">Contact</h2>
          <p className="mt-4">
            If you have questions about our tracking practices, please contact
            us at{" "}
            <a
              href="mailto:legal@encompassparking.com"
              className="text-accent-text underline underline-offset-4"
            >
              legal@encompassparking.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
