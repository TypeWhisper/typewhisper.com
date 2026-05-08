import { MacWindow } from "./mac-window";
import { RecordingNotch } from "./recording-notch";

interface EmailMockupProps {
  color: string;
  compact?: boolean;
  locale?: "en" | "de";
}

/**
 * Stylized Apple Mail-style compose window with TypeWhisper notch indicator
 * hanging from the top edge. Used for the "Dictate Emails" use case.
 */
export function EmailMockup({ color, compact = false, locale = "en" }: EmailMockupProps) {
  const t = locale === "de" ? copyDe : copyEn;

  return (
    <div className="relative h-full w-full pt-1">
      <MacWindow title={t.windowTitle} accent={color} className="h-full">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-black/5 bg-white px-4 py-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              {t.to}
            </span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700">
              {t.recipient}
            </span>
          </div>
          <div className="flex items-center gap-2 border-b border-black/5 bg-white px-4 py-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              {t.subject}
            </span>
            <span className="text-[12px] font-medium text-neutral-900">
              {t.subjectLine}
            </span>
          </div>

          <div className="relative flex-1 bg-white px-5 py-4">
            <p className="text-[12px] leading-relaxed text-neutral-700">
              {t.body}
              <span
                className="ml-0.5 inline-block h-3 w-[2px] align-[-1px] animate-pulse"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            </p>

            {!compact && (
              <p className="mt-3 text-[12px] leading-relaxed text-neutral-400">
                {t.signature}
              </p>
            )}
          </div>
        </div>
      </MacWindow>

      <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2">
        <RecordingNotch
          color={color}
          appIconSrc="/brand-logos/gmail/logo.svg"
          appIconAlt="Gmail"
          partialText={compact ? undefined : t.partialText}
          compact={compact}
        />
      </div>
    </div>
  );
}

const copyEn = {
  windowTitle: "New Message",
  to: "To:",
  recipient: "anna@acme.com",
  subject: "Subject:",
  subjectLine: "Re: Q3 Roadmap review",
  body: "Hi Anna, thanks for the detailed write-up. I went through the roadmap and have two thoughts on the timeline",
  signature: "Best,\nMarco",
  partialText:
    "two thoughts on the timeline — first, the Q3 milestone feels tight given the design review",
};

const copyDe = {
  windowTitle: "Neue Nachricht",
  to: "An:",
  recipient: "anna@acme.com",
  subject: "Betreff:",
  subjectLine: "Re: Q3 Roadmap-Review",
  body: "Hi Anna, danke für die ausführliche Übersicht. Ich habe die Roadmap einmal durchgesehen und zwei Gedanken zum Zeitplan",
  signature: "Viele Grüße,\nMarco",
  partialText:
    "zwei Gedanken zum Zeitplan — erstens fühlt sich das Q3-Milestone knapp an wegen des Design-Reviews",
};
