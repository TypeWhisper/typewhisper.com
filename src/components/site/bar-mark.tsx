/** Three bars as a list marker, the smallest form of the waveform. */
export function BarMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`site-mark ${className}`}
      fill="currentColor"
    >
      <rect x="0.5" y="4" width="2" height="4" rx="1" />
      <rect x="5" y="1" width="2" height="10" rx="1" />
      <rect x="9.5" y="3" width="2" height="6" rx="1" />
    </svg>
  );
}
