import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Services", href: "/services" },
      { label: "Member Portal", href: "https://encompass-ppb-web.vercel.app" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Request an Engagement", href: "/contact" },
      { label: "Book an Intro Call", href: "/contact#schedule" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-base">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
              {col.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((l) => {
                const isExternal = l.href.startsWith("http");
                return (
                  <li key={l.label}>
                    {isExternal ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-14 text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-14 text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6">
          <p className="text-12 text-text-tertiary">
            &copy; {new Date().getFullYear()} Encompass Parking, LLC. All rights reserved.
          </p>
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            Encompass Parking, LLC &middot; Los Angeles
          </p>
        </div>
      </div>
    </footer>
  );
}
