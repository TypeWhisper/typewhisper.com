import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="currentColor">
        <rect x="2" y="14" width="6" height="12" rx="3" className="text-primary" />
        <rect x="11" y="8" width="6" height="24" rx="3" className="text-primary" />
        <rect x="20" y="4" width="6" height="32" rx="3" className="text-primary" />
        <rect x="29" y="10" width="6" height="20" rx="3" className="text-primary" />
        <rect x="38" y="14" width="6" height="12" rx="3" className="text-primary" />
      </svg>
      {showText && (
        <span className="text-xl font-semibold tracking-tight font-display">
          TypeWhisper
        </span>
      )}
    </div>
  );
}
