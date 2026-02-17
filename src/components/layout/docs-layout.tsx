import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

const macSidebarLinks = [
  { href: "/docs/mac", label: "Overview" },
  { href: "/docs/mac/installation", label: "Installation" },
  { href: "/docs/mac/features", label: "Features" },
  { href: "/docs/mac/api", label: "HTTP API" },
  { href: "/docs/mac/cli", label: "CLI Tool" },
  { href: "/docs/mac/profiles", label: "Profiles" },
];

const windowsSidebarLinks = [
  { href: "/docs/windows", label: "Overview" },
  { href: "/docs/windows/installation", label: "Installation" },
  { href: "/docs/windows/features", label: "Features" },
  { href: "/docs/windows/api", label: "HTTP API" },
  { href: "/docs/windows/profiles", label: "Profiles" },
];

function getSidebarLinks(pathname: string) {
  if (pathname.startsWith("/docs/mac")) return macSidebarLinks;
  if (pathname.startsWith("/docs/windows")) return windowsSidebarLinks;
  return null;
}

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const sidebarLinks = getSidebarLinks(location.pathname);

  if (!sidebarLinks) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        {children}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <nav className="flex flex-col gap-1 lg:sticky lg:top-24">
            <Link
              to="/docs"
              className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="size-3.5" />
              All Platforms
            </Link>
            <div className="flex flex-row gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground",
                    location.pathname === link.href
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
