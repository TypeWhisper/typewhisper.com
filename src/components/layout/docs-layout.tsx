import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/features", label: "Features" },
  { href: "/docs/api", label: "HTTP API" },
  { href: "/docs/profiles", label: "Profiles" },
];

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <nav className="flex flex-row gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0 lg:sticky lg:top-24">
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
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
