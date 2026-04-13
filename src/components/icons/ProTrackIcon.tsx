export function ProTrackIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="6" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="26" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="9" y1="14.5" x2="13.5" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.5" y1="8.5" x2="23" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="17.5" x2="18.5" y2="23.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13.5" y1="23.5" x2="9" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
