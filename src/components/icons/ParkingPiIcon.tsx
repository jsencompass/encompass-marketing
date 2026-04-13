export function ParkingPiIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
      <line x1="21" y1="21" x2="28" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="17" x2="15" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
