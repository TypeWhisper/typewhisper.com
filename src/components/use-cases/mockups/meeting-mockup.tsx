import { Calendar, FileText, Hash } from "lucide-react";
import { MacWindow } from "./mac-window";
import { RecordingNotch } from "./recording-notch";

interface MeetingMockupProps {
  color: string;
  compact?: boolean;
  locale?: "en" | "de";
}

/**
 * Stylized Notion-style note mockup with a meeting protocol being dictated and
 * the TypeWhisper notch indicator hanging from the top edge.
 * Used for the "Meeting Notes" use case.
 */
export function MeetingMockup({
  color,
  compact = false,
  locale = "en",
}: MeetingMockupProps) {
  const t = locale === "de" ? copyDe : copyEn;

  return (
    <div className="relative h-full w-full pt-1">
      <MacWindow title={t.windowTitle} accent={color} className="h-full">
        <div className="flex flex-1">
          {!compact && (
            <div className="hidden w-32 shrink-0 flex-col gap-0.5 border-r border-black/5 bg-[#f7f6f3] px-2 py-3 text-[11px] text-neutral-700 sm:flex">
              <div className="px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500">
                {t.workspace}
              </div>
              {t.sidebar.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-1.5 rounded px-1.5 py-1 ${i === 0 ? "bg-neutral-200/70 font-medium text-neutral-900" : ""}`}
                >
                  <item.icon className="size-3 text-neutral-500" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="relative flex flex-1 flex-col bg-white">
            <div className="flex items-center gap-2 px-5 pb-2 pt-4">
              <span className="text-2xl" aria-hidden="true">
                📝
              </span>
              <h3 className="text-[15px] font-bold tracking-tight text-neutral-900">
                {t.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 px-5 pb-3 text-[10px] text-neutral-400">
              <Calendar className="size-3" aria-hidden="true" />
              <span>{t.date}</span>
              <span aria-hidden="true">·</span>
              <span>{t.attendees}</span>
            </div>

            <div className="flex flex-1 flex-col gap-2 overflow-hidden border-t border-black/5 px-5 py-3 text-[12px] leading-relaxed text-neutral-700">
              <div className="font-semibold text-neutral-900">{t.section1}</div>
              <ul className="ml-4 space-y-1">
                <li className="flex items-start gap-1.5">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-neutral-400" />
                  <span>{t.bullet1}</span>
                </li>
                {!compact && (
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-neutral-400" />
                    <span>{t.bullet2}</span>
                  </li>
                )}
              </ul>

              {!compact && (
                <>
                  <div className="mt-2 font-semibold text-neutral-900">
                    {t.section2}
                  </div>
                  <ul className="ml-4 space-y-1">
                    <li className="flex items-start gap-1.5">
                      <span
                        className="mt-1 inline-flex size-3.5 shrink-0 items-center justify-center rounded-sm border"
                        style={{ borderColor: color }}
                        aria-hidden="true"
                      >
                        <span
                          className="size-2 rounded-[1px]"
                          style={{ backgroundColor: color }}
                        />
                      </span>
                      <span>
                        {t.action1}
                        <span
                          className="ml-0.5 inline-block h-3 w-[2px] align-[-1px] animate-pulse"
                          style={{ backgroundColor: color }}
                          aria-hidden="true"
                        />
                      </span>
                    </li>
                  </ul>
                </>
              )}

              {compact && (
                <span
                  className="ml-0.5 inline-block h-3 w-[2px] animate-pulse self-start"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </MacWindow>

      <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2">
        <RecordingNotch
          color={color}
          appIconSrc="/brand-logos/notion/logo.svg"
          appIconAlt="Notion"
          partialText={compact ? undefined : t.partialText}
          compact={compact}
        />
      </div>
    </div>
  );
}

const copyEn = {
  windowTitle: "Standup — Notion",
  workspace: "Workspace",
  sidebar: [
    { label: "Standup notes", icon: FileText },
    { label: "Roadmap", icon: Hash },
    { label: "Hiring", icon: Hash },
  ],
  title: "Standup — May 8",
  date: "Today, 10:00",
  attendees: "4 attendees",
  section1: "Discussion",
  bullet1: "Decided to ship the new card layout this week",
  bullet2: "Pilot opens to internal testers Friday",
  section2: "Action items",
  action1: "Marco writes the release notes by Thursday",
  partialText:
    "Marco writes the release notes by Thursday and we ship the pilot to internal testers Friday",
};

const copyDe = {
  windowTitle: "Standup — Notion",
  workspace: "Workspace",
  sidebar: [
    { label: "Standup-Notizen", icon: FileText },
    { label: "Roadmap", icon: Hash },
    { label: "Hiring", icon: Hash },
  ],
  title: "Standup — 8. Mai",
  date: "Heute, 10:00",
  attendees: "4 Teilnehmer",
  section1: "Diskussion",
  bullet1: "Neues Card-Layout wird diese Woche ausgerollt",
  bullet2: "Pilotversuch startet Freitag für interne Tester",
  section2: "Action Items",
  action1: "Marco schreibt die Release Notes bis Donnerstag",
  partialText:
    "Marco schreibt die Release Notes bis Donnerstag, dann starten wir Freitag den Pilotversuch mit internen Testern",
};
