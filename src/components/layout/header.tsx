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
import { useState, useEffect } from "react";
import { t, localePath, getAlternatePath, type Locale } from "@/i18n/index";

function useHeaderState() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return { scrolled };
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
  const { scrolled } = useHeaderState();
  const navLinks = getNavLinks(locale);
  const alternatePath = getAlternatePath(currentPath, locale === "de" ? "en" : "de");
  const alternateLabel = locale === "de" ? "EN" : "DE";
  const isDark = theme === "dark";
  const headerChrome = isDark
    ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
    : "bg-[#fbfbfd]/80 backdrop-blur-xl border-b border-black/[0.06]";
  const foregroundClass = isDark ? "text-white" : "text-black";
  const mutedForegroundClass = isDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black";
  const iconButtonClass = isDark
    ? "text-white/70 hover:text-white hover:bg-white/10"
    : "text-black/70 hover:text-black hover:bg-black/5";
  const shouldShowChrome = isLanding || scrolled;

  return (
    <header
      data-testid="site-header"
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow] duration-300",
        shouldShowChrome ? headerChrome : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href={localePath(locale, "/")} className="flex items-center gap-3">
          <Logo textClassName={foregroundClass} />
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
                  isActive ? foregroundClass : mutedForegroundClass
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
              mutedForegroundClass
            )}
          >
            {alternateLabel}
          </a>

          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(iconButtonClass, "hidden md:inline-flex")}
            onClick={toggleTheme}
            aria-label={t(locale, "nav.toggleTheme")}
            data-testid="theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          <Button variant="ghost" size="icon-sm" asChild>
            <a
              href="https://ko-fi.com/seofood"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(locale, "nav.sponsor")}
              className={mutedForegroundClass}
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
              className={mutedForegroundClass}
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
              className={mutedForegroundClass}
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
                className={cn("md:hidden", iconButtonClass)}
                aria-label={t(locale, "nav.menu")}
              >
                <Menu className="size-4" />
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
                <Button
                  variant="ghost"
                  className="justify-start px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => {
                    toggleTheme();
                    setMobileOpen(false);
                  }}
                  data-testid="theme-toggle-mobile"
                >
                  {theme === "dark" ? (
                    <Sun className="size-4" />
                  ) : (
                    <Moon className="size-4" />
                  )}
                  {t(locale, "nav.toggleTheme")}
                </Button>
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
