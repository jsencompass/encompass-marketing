export function BreakerDiagonal() {
  return (
    <div className="h-[80px] w-full border-y border-border overflow-hidden" role="presentation">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="breaker-diagonal" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="0" y1="0" x2="0" y2="28" stroke="var(--accent-dim)" strokeWidth="0.5" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#breaker-diagonal)" />
      </svg>
    </div>
  );
}
