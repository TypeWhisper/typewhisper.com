import { usePageUrl } from "@/hooks/use-page-url";
import { Clock3, Download, Menu, Moon, Sun } from "lucide-react";
import { KofiIcon } from "@/components/ui/kofi-icon";
import { DiscordIcon } from "@/components/ui/discord-icon";
import { GitHubIcon } from "@/components/ui/github-icon";
import { BrandLogo, canRenderBrandLogo } from "@/components/ui/brand-logo";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";
import { cn } from "@/lib/utils";
import { discordUrl, getPlatformDownloadTarget } from "@/lib/platform-download";
import { useState } from "react";
import { t, localePath, getAlternatePath, type Locale } from "@/i18n/index";

function getNavLinks(locale: Locale) {
  return [
    {
      href: localePath(locale, "/use-cases"),
      label: t(locale, "nav.useCases"),
    },
    { href: localePath(locale, "/addons"), label: t(locale, "nav.addons") },
    { href: localePath(locale, "/pricing"), label: t(locale, "nav.pricing") },
    { href: localePath(locale, "/docs"), label: t(locale, "nav.docs") },
    {
      href: localePath(locale, "/changelog"),
      label: t(locale, "nav.changelog"),
    },
  ];
}

export function Header({
  currentPath = "/",
  locale = "en" as Locale,
}: {
  currentPath?: string;
  locale?: Locale;
}) {
  const { toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = getNavLinks(locale);
  const alternateLocale = locale === "de" ? "en" : "de";
  const alternateBasePath = getAlternatePath(currentPath, alternateLocale);
  const alternateLabel = alternateLocale.toUpperCase();
  const alternateName = alternateLocale === "de" ? "Deutsch" : "English";
  const platform = useSyncedLandingPlatform();
  const pageUrl = new URL(usePageUrl() || "https://www.typewhisper.com");
  const alternateParams = new URLSearchParams(pageUrl.search);
  if (!alternateParams.has("platform"))
    alternateParams.set("platform", platform);
  const alternatePath = `${alternateBasePath}?${alternateParams}${pageUrl.hash}`;
  const showGitHubBrandLogo = canRenderBrandLogo("github", "nav");
  const download = getPlatformDownloadTarget(platform, locale, "nav");
  const showDownloadCta = true;
  const headerChrome =
    "bg-background/80 backdrop-blur-xl border-b border-hairline";
  const foregroundClass = "text-foreground";
  const mutedForegroundClass = "text-muted-foreground hover:text-foreground";
  const iconButtonClass =
    "text-muted-foreground hover:text-foreground hover:bg-accent";

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
        <nav
          aria-label={t(locale, "nav.mainLabel")}
          className="hidden items-center gap-1 xl:flex"
        >
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.href || currentPath.startsWith(link.href);

            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-xs font-medium rounded-full transition-colors",
                  isActive ? foregroundClass : mutedForegroundClass,
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          {/* Desktop Download CTA */}
          {showDownloadCta &&
            (download.available ? (
              <Button
                size="sm"
                className="hidden xl:inline-flex mr-1 min-w-[170px] justify-center rounded-full"
                asChild
                data-testid="header-download"
              >
                <a
                  href={download.href}
                  target={download.opensNewTab ? "_blank" : undefined}
                  rel={download.opensNewTab ? "noopener noreferrer" : undefined}
                  data-download-social-trigger
                  data-download-platform={download.platform}
                  data-download-target={download.target}
                  data-download-version={download.version}
                  data-tracking-placement="header"
                >
                  <Download className="size-4" />
                  {download.label}
                </a>
              </Button>
            ) : (
              <Button
                size="sm"
                className="hidden xl:inline-flex mr-1 min-w-[170px] justify-center rounded-full"
                disabled
                data-testid="header-download"
              >
                <Clock3 className="size-4" />
                {download.label}
              </Button>
            ))}

          {/* Language Switcher */}
          <a
            href={alternatePath}
            hrefLang={alternateLocale}
            lang={alternateLocale}
            aria-label={alternateName}
            className={cn(
              "px-2 py-1 text-xs font-semibold rounded-full transition-colors",
              mutedForegroundClass,
            )}
          >
            {alternateLabel}
          </a>

          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(iconButtonClass, "hidden xl:inline-flex")}
            onClick={toggleTheme}
            aria-label={t(locale, "nav.toggleTheme")}
            data-testid="theme-toggle"
          >
            <Sun className="hidden size-4 dark:block" />
            <Moon className="size-4 dark:hidden" />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden xl:inline-flex"
            asChild
          >
            <a
              href={localePath(locale, "/sponsors")}
              aria-label={t(locale, "nav.sponsor")}
              className={mutedForegroundClass}
            >
              <KofiIcon className="size-4" aria-hidden="true" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden xl:inline-flex"
            asChild
          >
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className={mutedForegroundClass}
            >
              <DiscordIcon className="size-4" aria-hidden="true" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden xl:inline-flex"
            asChild
          >
            <a
              href="https://github.com/TypeWhisper"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={mutedForegroundClass}
            >
              {showGitHubBrandLogo ? (
                <BrandLogo
                  brand="github"
                  context="nav"
                  className="size-4"
                  alt="GitHub"
                />
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
                className={cn("xl:hidden", iconButtonClass)}
                aria-label={t(locale, "nav.menu")}
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="pt-12"
              title={t(locale, "nav.mobileTitle")}
              closeLabel={t(locale, "nav.closeMenu")}
            >
              <nav
                aria-label={t(locale, "nav.mainLabel")}
                className="flex flex-col gap-1 px-4 pb-4"
              >
                {showDownloadCta &&
                  (download.available ? (
                    <Button
                      asChild
                      className="mb-3 w-full rounded-full"
                      data-testid="header-download-mobile"
                    >
                      <a
                        href={download.href}
                        target={download.opensNewTab ? "_blank" : undefined}
                        rel={
                          download.opensNewTab
                            ? "noopener noreferrer"
                            : undefined
                        }
                        data-download-social-trigger
                        data-download-platform={download.platform}
                        data-download-target={download.target}
                        data-download-version={download.version}
                        data-tracking-placement="header"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Download className="size-4" />
                        {download.label}
                      </a>
                    </Button>
                  ) : (
                    <Button
                      className="mb-3 w-full rounded-full"
                      disabled
                      data-testid="header-download-mobile"
                    >
                      <Clock3 className="size-4" />
                      {download.label}
                    </Button>
                  ))}
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-3 py-2.5 text-sm font-medium rounded-[0.625rem] transition-colors hover:bg-accent",
                      currentPath === link.href ||
                        currentPath.startsWith(link.href)
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={alternatePath}
                  hrefLang={alternateLocale}
                  lang={alternateLocale}
                  className="px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-[0.625rem] transition-colors hover:bg-accent hover:text-foreground"
                >
                  {alternateName}
                </a>
                <Button
                  variant="ghost"
                  className="justify-start rounded-[0.625rem] px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => {
                    toggleTheme();
                    setMobileOpen(false);
                  }}
                  data-testid="theme-toggle-mobile"
                >
                  <Sun className="hidden size-4 dark:block" />
                  <Moon className="size-4 dark:hidden" />
                  {t(locale, "nav.toggleTheme")}
                </Button>
                <a
                  href={localePath(locale, "/sponsors")}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-[0.625rem] transition-colors hover:bg-accent hover:text-foreground"
                >
                  <KofiIcon className="size-4" aria-hidden="true" />
                  {t(locale, "nav.sponsor")}
                </a>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-[0.625rem] transition-colors hover:bg-accent hover:text-foreground"
                >
                  <DiscordIcon className="size-4" aria-hidden="true" />
                  Discord
                </a>
                <a
                  href="https://github.com/TypeWhisper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-[0.625rem] transition-colors hover:bg-accent hover:text-foreground"
                >
                  {showGitHubBrandLogo ? (
                    <BrandLogo
                      brand="github"
                      context="nav"
                      className="size-4"
                      alt=""
                    />
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
