import { Hash } from "lucide-react";
import { MacWindow } from "./mac-window";
import { RecordingNotch } from "./recording-notch";

interface ChatMockupProps {
  color: string;
  compact?: boolean;
  locale?: "en" | "de";
}

interface ChatMessage {
  initials: string;
  hue: string;
  author: string;
  time: string;
  text: string;
}

/**
 * Stylized Slack/Teams-style channel mockup with the TypeWhisper notch
 * indicator hanging from the top edge. Used for the "Slack & Teams Chat"
 * use case.
 */
export function ChatMockup({ color, compact = false, locale = "en" }: ChatMockupProps) {
  const t = locale === "de" ? copyDe : copyEn;

  return (
    <div className="relative h-full w-full pt-1">
      <MacWindow title={t.windowTitle} accent={color} className="h-full">
        <div className="flex flex-1">
          {!compact && (
            <div className="hidden w-32 shrink-0 flex-col gap-0.5 border-r border-black/5 bg-[#3f0e40] px-2 py-3 text-[11px] text-white/80 sm:flex">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                {t.workspace}
              </div>
              {t.sidebar.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-1.5 rounded px-2 py-1 ${i === 1 ? "bg-white/15 font-semibold text-white" : ""}`}
                >
                  <Hash className="size-3 opacity-60" aria-hidden="true" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-2 border-b border-black/5 bg-white px-4 py-2">
              <Hash className="size-3.5 text-neutral-400" aria-hidden="true" />
              <span className="text-[12px] font-semibold text-neutral-900">
                {t.channel}
              </span>
              {!compact && (
                <span className="ml-auto text-[10px] text-neutral-400">
                  {t.members}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2 overflow-hidden bg-white px-3 py-3">
              {(compact ? t.messages.slice(-1) : t.messages).map((m, i) => (
                <ChatMessageRow key={i} message={m} />
              ))}
            </div>

            <div className="border-t border-black/5 bg-white px-3 pb-3 pt-2">
              <div
                className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2"
                style={{ borderColor: `${color}66` }}
              >
                <span className="text-[12px] text-neutral-700">
                  {t.composeText}
                  <span
                    className="ml-0.5 inline-block h-3 w-[2px] align-[-1px] animate-pulse"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </MacWindow>

      <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2">
        <RecordingNotch
          color={color}
          appIconSrc="/brand-logos/slack/logo.svg"
          appIconAlt="Slack"
          partialText={compact ? undefined : t.partialText}
          compact={compact}
        />
      </div>
    </div>
  );
}

function ChatMessageRow({ message }: { message: ChatMessage }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
        style={{ backgroundColor: message.hue }}
        aria-hidden="true"
      >
        {message.initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[11px] font-semibold text-neutral-900">
            {message.author}
          </span>
          <span className="text-[10px] text-neutral-400">{message.time}</span>
        </div>
        <p className="truncate text-[11px] leading-snug text-neutral-700">
          {message.text}
        </p>
      </div>
    </div>
  );
}

const copyEn = {
  windowTitle: "Acme — Slack",
  workspace: "Acme",
  sidebar: ["general", "design-team", "eng-frontend", "random"],
  channel: "design-team",
  members: "12 members",
  composeText: "Looks great — let's review on Friday after the design sync",
  partialText:
    "looks great, let's review on Friday after the design sync and ship the pilot to internal testers",
  messages: [
    {
      initials: "AL",
      hue: "#0ea5e9",
      author: "Alex",
      time: "10:42",
      text: "Pushed the new card variants — check the Figma file",
    },
    {
      initials: "MK",
      hue: "#10b981",
      author: "Mira",
      time: "10:48",
      text: "Nice. The hover states feel much snappier now.",
    },
    {
      initials: "TS",
      hue: "#f59e0b",
      author: "Tom",
      time: "10:51",
      text: "Should we ship the pilot to internal testers this week?",
    },
  ] as ChatMessage[],
};

const copyDe = {
  windowTitle: "Acme — Slack",
  workspace: "Acme",
  sidebar: ["allgemein", "design-team", "eng-frontend", "random"],
  channel: "design-team",
  members: "12 Mitglieder",
  composeText: "Sieht gut aus — lass uns Freitag nach dem Sync drüberschauen",
  partialText:
    "sieht gut aus, lass uns Freitag nach dem Sync drüberschauen und den Pilotversuch an interne Tester schicken",
  messages: [
    {
      initials: "AL",
      hue: "#0ea5e9",
      author: "Alex",
      time: "10:42",
      text: "Habe die neuen Card-Varianten gepusht — schaut mal ins Figma",
    },
    {
      initials: "MK",
      hue: "#10b981",
      author: "Mira",
      time: "10:48",
      text: "Top. Die Hover-States fühlen sich jetzt viel knackiger an.",
    },
    {
      initials: "TS",
      hue: "#f59e0b",
      author: "Tom",
      time: "10:51",
      text: "Sollen wir den Pilotversuch diese Woche an interne Tester schicken?",
    },
  ] as ChatMessage[],
};
