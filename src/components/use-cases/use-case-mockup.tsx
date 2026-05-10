import type { Locale } from "@/i18n/index";
import { ChatMockup } from "./mockups/chat-mockup";
import { CodeMockup } from "./mockups/code-mockup";
import { EmailMockup } from "./mockups/email-mockup";
import { IndustryMockup } from "./mockups/industry-mockup";
import { MeetingMockup } from "./mockups/meeting-mockup";

interface UseCaseMockupProps {
  /** Use-case slug used to dispatch to the right mockup. */
  slug: string;
  /** Brand color of the use case, applied as accent throughout the mockup. */
  color: string;
  /** Compact variant for cards (smaller, less detail). */
  compact?: boolean;
  locale?: Locale;
}

/**
 * Picks the right HTML/CSS mockup for a given use case slug. Returns null for
 * unknown slugs so the caller can fall back to a static screenshot.
 */
export function UseCaseMockup({
  slug,
  color,
  compact = false,
  locale = "en",
}: UseCaseMockupProps) {
  switch (slug) {
    case "emails":
      return <EmailMockup color={color} compact={compact} locale={locale} />;
    case "chat":
      return <ChatMockup color={color} compact={compact} locale={locale} />;
    case "code":
      return <CodeMockup color={color} compact={compact} locale={locale} />;
    case "meeting-notes":
      return <MeetingMockup color={color} compact={compact} locale={locale} />;
    case "real-estate":
    case "architecture":
    case "legal":
      return (
        <IndustryMockup
          slug={slug}
          color={color}
          compact={compact}
          locale={locale}
        />
      );
    default:
      return null;
  }
}

export function hasUseCaseMockup(slug: string): boolean {
  return [
    "emails",
    "chat",
    "code",
    "meeting-notes",
    "real-estate",
    "architecture",
    "legal",
  ].includes(slug);
}
