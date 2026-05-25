import { Download, Menu, Moon, Sun } from "lucide-react";
import { KofiIcon } from "@/components/ui/kofi-icon";
import { DiscordIcon } from "@/components/ui/discord-icon";
import { GitHubIcon } from "@/components/ui/github-icon";
import { BrandLogo, canRenderBrandLogo } from "@/components/ui/brand-logo";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";
import { usePlatform } from "@/hooks/use-platform";
import { cn } from "@/lib/utils";
import {
  discordUrl,
  getPlatformDownloadTarget,
} from "@/lib/platform-download";
import { useState } from "react";
import { t, localePath, getAlternatePath, type Locale } from "@/i18n/index";

function getNavLinks(locale: Locale) {
  return [
    { href: localePath(locale, "/use-cases"), label: t(locale, "nav.useCases") },
    { href: localePath(locale, "/addons"), label: t(locale, "nav.addons") },
    { href: localePath(locale, "/pricing"), label: t(locale, "nav.pricing") },
    { href: localePath(locale, "/docs"), label: t(locale, "nav.docs") },
    { href: localePath(locale, "/changelog"), label: t(locale, "nav.changelog") },
  ];
}

export function Header({ currentPath = "/", locale = "en" as Locale }: { currentPath?: string; locale?: Locale }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = getNavLinks(locale);
  const alternatePath = getAlternatePath(currentPath, locale === "de" ? "en" : "de");
  const alternateLabel = locale === "de" ? "EN" : "DE";
  const platform = usePlatform();
  const showGitHubBrandLogo = canRenderBrandLogo("github", "nav");
  const download = getPlatformDownloadTarget(platform, locale, "nav");
  const downloadOpensNewTab = download.platform === "ios";
  const showDownloadCta = true;
  const isDark = theme === "dark";
  const headerChrome = isDark
    ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
    : "bg-[#fbfbfd]/80 backdrop-blur-xl border-b border-black/[0.06]";
  const foregroundClass = isDark ? "text-white" : "text-black";
  const mutedForegroundClass = isDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black";
  const iconButtonClass = isDark
    ? "text-white/70 hover:text-white hover:bg-white/10"
    : "text-black/70 hover:text-black hover:bg-black/5";

  return (
    <header
      data-testid="site-header"
      className={cn("sticky top-0 z-40 w-full", headerChrome)}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href={localePath(locale, "/")} className="flex items-center gap-3">
          <Logo textClassName={foregroundClass} />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.href || currentPath.startsWith(link.href);

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
          {/* Desktop Download CTA */}
          {showDownloadCta && (
            <Button
              size="sm"
              className="hidden md:inline-flex mr-1 min-w-[170px] justify-center rounded-full"
              asChild
              data-testid="header-download"
            >
              <a
                href={download.href}
                target={downloadOpensNewTab ? "_blank" : undefined}
                rel={downloadOpensNewTab ? "noopener noreferrer" : undefined}
                data-download-social-trigger
              >
                <Download className="size-4" />
                {download.label}
              </a>
            </Button>
          )}

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
              href={localePath(locale, "/sponsors")}
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
              {showGitHubBrandLogo ? (
                <BrandLogo brand="github" context="nav" className="size-4" alt="GitHub" />
              ) : (
                <GitHubIcon className="size-4" />
              )}
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
                {showDownloadCta && (
                  <Button
                    asChild
                    className="mb-3 w-full rounded-full"
                    data-testid="header-download-mobile"
                  >
                    <a
                      href={download.href}
                      target={downloadOpensNewTab ? "_blank" : undefined}
                      rel={downloadOpensNewTab ? "noopener noreferrer" : undefined}
                      data-download-social-trigger
                      onClick={() => setMobileOpen(false)}
                    >
                      <Download className="size-4" />
                      {download.label}
                    </a>
                  </Button>
                )}
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-3 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-accent",
                      currentPath === link.href ||
                        currentPath.startsWith(link.href)
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
                  href={localePath(locale, "/sponsors")}
                  onClick={() => setMobileOpen(false)}
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
                  {showGitHubBrandLogo ? (
                    <BrandLogo brand="github" context="nav" className="size-4" alt="GitHub" />
                  ) : (
                    <GitHubIcon className="size-4" />
                  )}
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
