export function BreakerDots() {
  return (
    <div className="h-[80px] w-full border-y border-border overflow-hidden" role="presentation">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="breaker-dots" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.5" fill="var(--accent-dim)" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#breaker-dots)" />
      </svg>
    </div>
  );
}
