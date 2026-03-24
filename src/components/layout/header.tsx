import { Menu, Moon, Sun } from "lucide-react";
import { KofiIcon } from "@/components/ui/kofi-icon";
import { DiscordIcon } from "@/components/ui/discord-icon";
import { GitHubIcon } from "@/components/ui/github-icon";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { discordUrl } from "@/lib/platform-download";
import { useState, useEffect, useRef, useCallback } from "react";
import { t, localePath, getAlternatePath, type Locale } from "@/i18n/index";

function useHeaderState(isLanding: boolean) {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const update = useCallback(() => {
    setScrolled(window.scrollY > 10);

    if (!isLanding) return;

    const header = headerRef.current;
    if (!header) return;

    // Check the element just below the header to determine section theme
    const headerBottom = header.getBoundingClientRect().bottom;
    // Temporarily hide header so elementFromPoint can see through it
    header.style.pointerEvents = "none";
    header.style.visibility = "hidden";
    const el = document.elementFromPoint(window.innerWidth / 2, headerBottom + 2);
    header.style.pointerEvents = "";
    header.style.visibility = "";

    if (el) {
      // Walk up the DOM to find the nearest section with a theme class
      const section = el.closest(".section-dark, .section-dark-card, .section-light, .section-light-gray, footer");
      const dark =
        section?.classList.contains("section-dark") === true ||
        section?.classList.contains("section-dark-card") === true;
      setOverDark(dark);
    }
  }, [isLanding]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  return { scrolled, overDark, headerRef };
}

function getNavLinks(locale: Locale) {
  return [
    { href: localePath(locale, "/#features"), label: t(locale, "nav.features") },
    { href: localePath(locale, "/use-cases"), label: t(locale, "nav.useCases") },
    { href: localePath(locale, "/addons"), label: t(locale, "nav.addons") },
    { href: localePath(locale, "/docs"), label: t(locale, "nav.docs") },
    { href: localePath(locale, "/benchmark"), label: t(locale, "nav.benchmark") },
    { href: localePath(locale, "/changelog"), label: t(locale, "nav.changelog") },
  ];
}

export function Header({ currentPath = "/", locale = "en" as Locale }: { currentPath?: string; locale?: Locale }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLanding = currentPath === localePath(locale, "/") || currentPath === `${localePath(locale, "/")}/`;
  const { scrolled, overDark, headerRef } = useHeaderState(isLanding);
  const navLinks = getNavLinks(locale);
  const alternatePath = getAlternatePath(currentPath, locale === "de" ? "en" : "de");
  const alternateLabel = locale === "de" ? "EN" : "DE";

  // On landing page: adapt to current section. On other pages: use theme.
  const isDark = isLanding ? overDark : theme === "dark";

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow] duration-300",
        isLanding
          ? isDark
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-[#fbfbfd] border-b border-black/[0.04]"
          : scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href={localePath(locale, "/")} className="flex items-center gap-3">
          <Logo
            textClassName={
              isLanding
                ? isDark
                  ? "text-white"
                  : "text-black"
                : undefined
            }
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.href ||
              (link.href !== localePath(locale, "/#features") &&
                currentPath.startsWith(link.href));

            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-xs font-medium rounded-md transition-colors",
                  isLanding
                    ? isDark
                      ? isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white/70"
                      : isActive
                        ? "text-black"
                        : "text-black/50 hover:text-black/70"
                    : isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          {/* Language Switcher */}
          <a
            href={alternatePath}
            className={cn(
              "px-2 py-1 text-xs font-semibold rounded-md transition-colors",
              isLanding
                ? isDark
                  ? "text-white/50 hover:text-white"
                  : "text-black/50 hover:text-black"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {alternateLabel}
          </a>

          {!isLanding && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleTheme}
              aria-label={t(locale, "nav.toggleTheme")}
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          )}

          <Button variant="ghost" size="icon-sm" asChild>
            <a
              href="https://ko-fi.com/seofood"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(locale, "nav.sponsor")}
              className={cn(
                isLanding &&
                  (isDark
                    ? "text-white/50 hover:text-white"
                    : "text-black/50 hover:text-black")
              )}
            >
              <KofiIcon className="size-4" />
            </a>
          </Button>

          <Button variant="ghost" size="icon-sm" asChild>
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className={cn(
                isLanding &&
                  (isDark
                    ? "text-white/50 hover:text-white"
                    : "text-black/50 hover:text-black")
              )}
            >
              <DiscordIcon className="size-4" />
            </a>
          </Button>

          <Button variant="ghost" size="icon-sm" asChild>
            <a
              href="https://github.com/TypeWhisper"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={cn(
                isLanding &&
                  (isDark
                    ? "text-white/50 hover:text-white"
                    : "text-black/50 hover:text-black")
              )}
            >
              <GitHubIcon className="size-4" />
            </a>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label={t(locale, "nav.menu")}
              >
                <Menu
                  className={cn(
                    "size-4",
                    isLanding && (isDark ? "text-white/70" : "text-black/70")
                  )}
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-12">
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-3 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-accent",
                      currentPath === link.href ||
                        (link.href !== localePath(locale, "/#features") &&
                          currentPath.startsWith(link.href))
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={alternatePath}
                  className="px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:bg-accent hover:text-foreground"
                >
                  {alternateLabel === "DE" ? "Deutsch" : "English"}
                </a>
                <a
                  href="https://ko-fi.com/seofood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:bg-accent hover:text-foreground"
                >
                  <KofiIcon className="size-4" />
                  {t(locale, "nav.sponsor")}
                </a>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:bg-accent hover:text-foreground"
                >
                  <DiscordIcon className="size-4" />
                  Discord
                </a>
                <a
                  href="https://github.com/TypeWhisper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:bg-accent hover:text-foreground"
                >
                  <GitHubIcon className="size-4" />
                  GitHub
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
