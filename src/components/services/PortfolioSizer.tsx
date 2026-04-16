"use client";

interface PortfolioSizerProps {
  count: number;
  onChange: (value: number) => void;
  recommendedTier: string;
}

export function PortfolioSizer({
  count,
  onChange,
  recommendedTier,
}: PortfolioSizerProps) {
  const displayCount =
    count >= 60
      ? "60+ sites"
      : count === 1
        ? "1 site"
        : `${count} sites`;

  return (
    <div
      className="mt-9 p-6 border border-border/70 rounded-[14px] flex items-center gap-6 flex-wrap"
      style={{
        background:
          "linear-gradient(135deg, rgba(108,92,231,0.04), transparent 60%)",
      }}
    >
      {/* Icon */}
      <div className="shrink-0 w-[42px] h-[42px] rounded-[10px] bg-accent/15 grid place-items-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent-text)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
        </svg>
      </div>

      {/* Label */}
      <div className="flex-1 min-w-[200px]">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-text mb-1">
          Find your tier
        </div>
        <div className="text-[15px] font-medium text-text-primary">
          How many sites are in your portfolio?
        </div>
      </div>

      {/* Slider + readout */}
      <div className="flex items-center gap-3.5 flex-1 min-w-[280px]">
        <input
          type="range"
          min="1"
          max="60"
          step="1"
          value={count}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="portfolio-slider flex-1"
          aria-label="Portfolio size in number of sites"
        />
        <div className="text-right">
          <div className="font-mono text-[18px] font-medium text-text-primary min-w-[90px]">
            {displayCount}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-tertiary mt-0.5">
            &rarr; {recommendedTier}
          </div>
        </div>
      </div>
    </div>
  );
}
