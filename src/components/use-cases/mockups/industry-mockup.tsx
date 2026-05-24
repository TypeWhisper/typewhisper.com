import { Building2, Home, Scale } from "lucide-react";
import type { ComponentType } from "react";
import { MacWindow } from "./mac-window";
import { RecordingNotch } from "./recording-notch";

interface IndustryMockupProps {
  slug: "real-estate" | "architecture" | "legal" | "law-firm-dictation";
  color: string;
  compact?: boolean;
  locale?: "en" | "de";
}

export function IndustryMockup({
  slug,
  color,
  compact = false,
  locale = "en",
}: IndustryMockupProps) {
  const copy = content[locale][slug];
  const Icon = icons[slug];

  return (
    <div className="relative h-full w-full pt-1">
      <MacWindow title={copy.windowTitle} accent={color} className="h-full">
        <div className="grid flex-1 grid-cols-[0.9fr_1.4fr] bg-neutral-50">
          {!compact && (
            <aside className="border-r border-black/5 bg-white px-4 py-4">
              <div className="text-[10px] font-semibold uppercase text-neutral-400">
                {copy.sidebarTitle}
              </div>
              <div className="mt-3 space-y-2">
                {copy.presets.map((preset) => (
                  <div
                    key={preset}
                    className="rounded-lg border px-3 py-2 text-[11px] font-medium"
                    style={{
                      borderColor: preset === copy.activePreset ? `${color}66` : "rgba(0,0,0,0.06)",
                      backgroundColor: preset === copy.activePreset ? `${color}12` : "#fafafa",
                      color: preset === copy.activePreset ? color : "#525252",
                    }}
                  >
                    {preset}
                  </div>
                ))}
              </div>
            </aside>
          )}

          <main className={compact ? "col-span-2 px-4 pb-4 pt-8" : "px-5 pb-5 pt-10"}>
            <div className="flex items-center gap-2">
              <span
                className="flex size-8 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: color }}
              >
                <Icon className="size-4" />
              </span>
              <div>
                <div className="text-[11px] font-semibold uppercase text-neutral-400">
                  {copy.badge}
                </div>
                <h3 className="text-[14px] font-semibold text-neutral-950">
                  {copy.documentTitle}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-neutral-700">
              {copy.body}
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block h-3 w-[2px] align-[-1px] animate-pulse"
                style={{ backgroundColor: color }}
              />
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {copy.terms.slice(0, compact ? 4 : 7).map((term) => (
                <span
                  key={term}
                  className="rounded-full border bg-white px-2 py-0.5 text-[10px] font-medium text-neutral-600"
                  style={{ borderColor: `${color}33` }}
                >
                  {term}
                </span>
              ))}
            </div>
          </main>
        </div>
      </MacWindow>

      <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2">
        <RecordingNotch
          appIcon={Icon as ComponentType<{ className?: string }>}
          partialText={compact ? undefined : copy.partialText}
          compact={compact}
        />
      </div>
    </div>
  );
}

const icons = {
  "real-estate": Home,
  architecture: Building2,
  legal: Scale,
  "law-firm-dictation": Scale,
};

const content = {
  en: {
    "real-estate": {
      windowTitle: "TypeWhisper Dictionary",
      sidebarTitle: "Writing focus",
      presets: ["General", "Real Estate", "Architecture", "Legal"],
      activePreset: "Real Estate",
      badge: "real-estate term pack",
      documentTitle: "Viewing follow-up",
      body:
        "The apartment has a bright living area, current energy certificate, separate utility space, and a purchase agreement draft already prepared for the notary appointment",
      terms: ["Exposé", "Land register", "Energy certificate", "Living area", "Viewing", "Commission", "Purchase agreement"],
      partialText:
        "current energy certificate, separate utility space, and a purchase agreement draft already prepared",
    },
    architecture: {
      windowTitle: "TypeWhisper Dictionary",
      sidebarTitle: "Writing focus",
      presets: ["General", "Real Estate", "Architecture", "Legal"],
      activePreset: "Architecture",
      badge: "architecture term pack",
      documentTitle: "Site note",
      body:
        "For execution planning we still need the updated bill of quantities, structural calculation, and the defect list from the last site meeting",
      terms: ["HOAI", "Bill of quantities", "Execution planning", "Site supervision", "Defects", "Measurement", "Client"],
      partialText:
        "updated bill of quantities, structural calculation, and the defect list from the last site meeting",
    },
    legal: {
      windowTitle: "TypeWhisper Dictionary",
      sidebarTitle: "Writing focus",
      presets: ["General", "Real Estate", "Architecture", "Legal"],
      activePreset: "Legal",
      badge: "legal term pack",
      documentTitle: "Case note draft",
      body:
        "The client granted power of attorney. Next step is a statement of claim draft, while the limitation deadline and GDPR references remain separately checked",
      terms: ["Mandate", "Pleading", "Statement of claim", "Deadline", "Power of attorney", "Claim", "GDPR"],
      partialText:
        "statement of claim draft, while the limitation deadline and GDPR references remain separately checked",
    },
    "law-firm-dictation": {
      windowTitle: "TypeWhisper Dictation",
      sidebarTitle: "Firm workflows",
      presets: ["Case note", "Email draft", "Pleading draft", "Term correction"],
      activePreset: "Case note",
      badge: "law-firm dictation",
      documentTitle: "Case note draft",
      body:
        "The client call is captured as a raw note. The pleading draft, deadline, and GDPR reference remain reviewed by the firm before use",
      terms: ["Case note", "Email draft", "Pleading", "Deadline", "Power of attorney", "GDPR", "Review"],
      partialText:
        "raw note. The pleading draft, deadline, and GDPR reference remain reviewed by the firm",
    },
  },
  de: {
    "real-estate": {
      windowTitle: "TypeWhisper Wörterbuch",
      sidebarTitle: "Schreibfokus",
      presets: ["Allgemein", "Immobilien", "Architektur", "Jura"],
      activePreset: "Immobilien",
      badge: "Immobilien-Termpack",
      documentTitle: "Besichtigungs-Follow-up",
      body:
        "Die Wohnung hat einen hellen Wohnbereich, einen aktuellen Energieausweis, separate Nutzfläche und einen Kaufvertragsentwurf für den Notartermin",
      terms: ["Exposé", "Grundbuch", "Energieausweis", "Wohnfläche", "Besichtigung", "Provision", "Kaufvertrag"],
      partialText:
        "aktuellen Energieausweis, separate Nutzfläche und einen Kaufvertragsentwurf für den Notartermin",
    },
    architecture: {
      windowTitle: "TypeWhisper Wörterbuch",
      sidebarTitle: "Schreibfokus",
      presets: ["Allgemein", "Immobilien", "Architektur", "Jura"],
      activePreset: "Architektur",
      badge: "Architektur-Termpack",
      documentTitle: "Baustellennotiz",
      body:
        "Für die Ausführungsplanung fehlen noch das aktualisierte Leistungsverzeichnis, die Statik und die Mängelliste aus der letzten Baubesprechung",
      terms: ["HOAI", "Leistungsverzeichnis", "Ausführungsplanung", "Bauleitung", "Mängel", "Aufmaß", "Bauherr"],
      partialText:
        "aktualisierte Leistungsverzeichnis, die Statik und die Mängelliste aus der letzten Baubesprechung",
    },
    legal: {
      windowTitle: "TypeWhisper Wörterbuch",
      sidebarTitle: "Schreibfokus",
      presets: ["Allgemein", "Immobilien", "Architektur", "Jura"],
      activePreset: "Jura",
      badge: "Legal-Termpack",
      documentTitle: "Mandatsnotiz",
      body:
        "Die Mandantin hat die Vollmacht erteilt. Als nächstes entsteht ein Entwurf der Klageschrift, während Frist und DSGVO-Bezug gesondert geprüft bleiben",
      terms: ["Mandat", "Schriftsatz", "Klageschrift", "Frist", "Vollmacht", "Anspruch", "DSGVO"],
      partialText:
        "Entwurf der Klageschrift, während Frist und DSGVO-Bezug gesondert geprüft bleiben",
    },
    "law-firm-dictation": {
      windowTitle: "TypeWhisper Diktat",
      sidebarTitle: "Kanzlei-Workflows",
      presets: ["Mandatsnotiz", "E-Mail-Entwurf", "Schriftsatz", "Fachwort-Korrektur"],
      activePreset: "Mandatsnotiz",
      badge: "Kanzlei-Diktat",
      documentTitle: "Mandatsnotiz",
      body:
        "Das Mandantengespräch wird als Rohnotiz erfasst. Schriftsatzentwurf, Frist und DSGVO-Bezug bleiben vor Verwendung durch die Kanzlei geprüft",
      terms: ["Mandatsnotiz", "E-Mail", "Schriftsatz", "Frist", "Vollmacht", "DSGVO", "Prüfung"],
      partialText:
        "Rohnotiz erfasst. Schriftsatzentwurf, Frist und DSGVO-Bezug bleiben geprüft",
    },
  },
} as const;
