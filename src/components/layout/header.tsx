import { Menu, Moon, Sun, Github } from "lucide-react";
import { KofiIcon } from "@/components/ui/kofi-icon";
import { DiscordIcon } from "@/components/ui/discord-icon";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { discordUrl } from "@/lib/platform-download";
import { useState, useEffect, useRef, useCallback } from "react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/addons", label: "Add-ons" },
  { href: "/docs", label: "Docs" },
  { href: "/benchmark", label: "Benchmark" },
  { href: "/changelog", label: "ChangeLog" },
];

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

export function Header({ currentPath = "/" }: { currentPath?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLanding = currentPath === "/";
  const { scrolled, overDark, headerRef } = useHeaderState(isLanding);

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
        <a href="/" className="flex items-center gap-3">
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
              (link.href !== "/#features" &&
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
          {!isLanding && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
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
              aria-label="Sponsor"
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
              <Github className="size-4" />
            </a>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Menu"
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
                        (link.href !== "/#features" &&
                          currentPath.startsWith(link.href))
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://ko-fi.com/seofood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:bg-accent hover:text-foreground"
                >
                  <KofiIcon className="size-4" />
                  Sponsor
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
                  <Github className="size-4" />
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
