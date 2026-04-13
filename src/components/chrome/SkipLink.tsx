export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-14 focus:font-semibold focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-accent-text"
    >
      Skip to main content
    </a>
  );
}
