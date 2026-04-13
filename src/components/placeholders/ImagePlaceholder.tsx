export function ImagePlaceholder({
  path,
  dimensions,
  format,
  description,
  aspectRatio,
  className = "",
}: {
  path: string;
  dimensions: string;
  format: string;
  description: string;
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-dashed border-accent-dim bg-bg-raised p-6 ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <div className="flex items-center gap-2 text-12 text-text-tertiary">
        <span className="text-accent-text">&#x25C8;</span>
        <span className="font-semibold uppercase tracking-widest">Image Placeholder</span>
      </div>
      <p className="mt-3 font-mono text-14 text-text-secondary">{path}</p>
      <p className="mt-2 font-mono text-18 font-medium text-accent-text">{dimensions}</p>
      <p className="mt-2 text-[13px] text-text-tertiary">{format}</p>
      <p className="mt-3 text-14 leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}
