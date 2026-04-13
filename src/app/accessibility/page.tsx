import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement — Encompass Parking",
  description:
    "Encompass Parking is committed to digital accessibility conforming to WCAG 2.1 Level AA.",
};

export default function Accessibility() {
  return (
    <article className="mx-auto max-w-[800px] px-6 py-24 md:py-32">
      <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
        Legal
      </p>
      <h1 className="mt-4 text-48 font-semibold tracking-tight">
        Accessibility Statement
      </h1>
      <p className="mt-4 text-14 text-text-tertiary">
        Last Updated: April 2026
      </p>

      <div className="mt-12 space-y-10 text-16 leading-relaxed text-text-secondary">
        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Our Commitment
          </h2>
          <p className="mt-4">
            Encompass Parking, LLC is committed to ensuring digital
            accessibility for people with disabilities. We are continually
            improving the user experience for everyone and applying the
            relevant accessibility standards to ensure we provide equal access
            to all users.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Conformance Standard
          </h2>
          <p className="mt-4">
            We aim to conform to the Web Content Accessibility Guidelines
            (WCAG) 2.1 at Level AA. These guidelines explain how to make web
            content more accessible to people with a wide array of
            disabilities, including visual, auditory, physical, speech,
            cognitive, language, learning, and neurological disabilities.
          </p>
          <p className="mt-4">
            While we strive to adhere to the WCAG 2.1 Level AA standard, we
            acknowledge that it is not always possible to do so in all areas
            of the website. We are actively working to increase the
            accessibility and usability of our website and, in doing so, we
            align with available standards and guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Testing and Monitoring
          </h2>
          <p className="mt-4">
            We regularly test the Site using a combination of automated tools
            and manual review:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text-primary">
                Automated testing:
              </strong>{" "}
              We use Lighthouse accessibility audits and axe-core automated
              accessibility testing as part of our development and deployment
              process.
            </li>
            <li>
              <strong className="text-text-primary">Manual review:</strong> We
              perform periodic manual testing including keyboard navigation,
              screen reader compatibility, and color contrast verification.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Known Limitations
          </h2>
          <p className="mt-4">
            Despite our efforts, some content may not yet be fully accessible.
            We are aware of the following limitations and are working to
            address them:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Some placeholder images may lack descriptive alternative text
              (these will be updated as final imagery is added)
            </li>
            <li>
              Some decorative elements may not have appropriate ARIA roles
              applied in all contexts
            </li>
          </ul>
          {/* <!-- ATTORNEY-REVIEW: Update this section as accessibility audits are completed. Remove resolved items and add any newly discovered issues. --> */}
        </section>

        <section>
          <h2 className="text-24 font-semibold text-text-primary">
            Feedback and Contact
          </h2>
          <p className="mt-4">
            We welcome your feedback on the accessibility of the Encompass
            Parking website. If you encounter any accessibility barriers or
            have suggestions for improvement, please contact us:
          </p>
          <address className="mt-4 not-italic">
            <p>
              Email:{" "}
              <a
                href="mailto:accessibility@encompassparking.com"
                className="text-accent-text underline underline-offset-4"
              >
                accessibility@encompassparking.com
              </a>
            </p>
          </address>
          <p className="mt-4">
            We aim to respond to accessibility feedback within 5 business days
            and to propose a solution within 10 business days.
          </p>
        </section>
      </div>
    </article>
  );
}
