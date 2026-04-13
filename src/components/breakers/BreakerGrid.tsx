export function BreakerGrid() {
  return (
    <div className="h-[80px] w-full border-y border-border overflow-hidden" role="presentation">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="breaker-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--accent-dim)" strokeWidth="0.5" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#breaker-grid)" />
      </svg>
    </div>
  );
}
