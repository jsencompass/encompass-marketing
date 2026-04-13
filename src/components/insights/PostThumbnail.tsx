import type { ReactNode } from "react";

const thumbnails: Record<string, () => ReactNode> = {
  "01-why-controllership": () => (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <rect width="320" height="180" fill="var(--bg-elevated)" />
      {[80, 60, 44, 32, 24].map((r, i) => (
        <circle key={i} cx="160" cy="90" r={r} fill="none" stroke="var(--accent)" strokeWidth="1" opacity={0.15 + i * 0.12} />
      ))}
      <circle cx="160" cy="90" r="4" fill="var(--accent)" opacity="0.8" />
    </svg>
  ),
  "02-lost-art-parking-audit": () => (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <rect width="320" height="180" fill="var(--bg-elevated)" />
      <defs><pattern id="th-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="1" fill="var(--accent)" opacity="0.15" /></pattern></defs>
      <rect x="40" y="20" width="240" height="140" fill="url(#th-dots)" />
      <circle cx="180" cy="90" r="50" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
      <line x1="215" y1="125" x2="260" y2="160" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  "03-four-lane-operating-model": () => (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <rect width="320" height="180" fill="var(--bg-elevated)" />
      {[0.4, 0.6, 0.8, 1.0].map((opacity, i) => (
        <rect key={i} x="60" y={36 + i * 32} width="200" height="4" rx="2" fill="var(--accent)" opacity={opacity} />
      ))}
    </svg>
  ),
  "04-noi-erosion-patterns": () => (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <rect width="320" height="180" fill="var(--bg-elevated)" />
      {[
        { x: 80, y: 50, shape: "circle" },
        { x: 160, y: 50, shape: "rect" },
        { x: 240, y: 50, shape: "circle" },
        { x: 80, y: 110, shape: "rect" },
        { x: 160, y: 110, shape: "circle" },
        { x: 240, y: 110, shape: "rect" },
      ].map((el, i) => (
        el.shape === "circle"
          ? <circle key={i} cx={el.x} cy={el.y} r="16" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity={1 - i * 0.12} />
          : <rect key={i} x={el.x - 14} y={el.y - 14} width="28" height="28" rx="4" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity={1 - i * 0.12} />
      ))}
    </svg>
  ),
};

export function PostThumbnail({ slug, className = "" }: { slug: string; className?: string }) {
  const Thumb = thumbnails[slug];
  if (!Thumb) {
    return (
      <div className={`overflow-hidden rounded-lg border border-border bg-bg-elevated ${className}`}>
        <svg viewBox="0 0 320 180" className="h-full w-full">
          <rect width="320" height="180" fill="var(--bg-elevated)" />
          <circle cx="160" cy="90" r="20" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`overflow-hidden rounded-lg border border-border ${className}`}>
      <Thumb />
    </div>
  );
}
