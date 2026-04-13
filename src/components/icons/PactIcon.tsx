export function PactIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}
