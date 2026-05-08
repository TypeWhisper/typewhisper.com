import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MacWindowProps {
  /** Title shown in the title bar. Optional. */
  title?: string;
  /** Optional brand-color tint for the title bar accent. */
  accent?: string;
  /** Content rendered inside the window. */
  children: ReactNode;
  className?: string;
}

/**
 * Stylized macOS window chrome (traffic lights + title bar + content slot).
 * Pure CSS, no platform fonts assumed beyond the global SF Pro fallback.
 */
export function MacWindow({ title, accent, children, className }: MacWindowProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white text-[13px] text-neutral-900 shadow-2xl ring-1 ring-black/5",
        className,
      )}
    >
      <div className="relative flex h-9 shrink-0 items-center gap-2 border-b border-black/10 bg-[linear-gradient(180deg,#f7f7f8_0%,#ececef_100%)] px-3">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febb2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        {title && (
          <span className="absolute left-1/2 -translate-x-1/2 text-[12px] font-medium text-neutral-600">
            {title}
          </span>
        )}
        {accent && (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}66, transparent)`,
            }}
          />
        )}
      </div>
      <div className="relative flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
