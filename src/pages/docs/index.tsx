import { Link } from "react-router";
import { DocsLayout } from "@/components/layout/docs-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Apple, Monitor, Smartphone } from "lucide-react";

const platforms = [
  {
    href: "/docs/mac",
    icon: Apple,
    title: "macOS",
    description: "Complete documentation for TypeWhisper on macOS.",
    disabled: false,
  },
  {
    href: "/docs/windows",
    icon: Monitor,
    title: "Windows",
    description: "Complete documentation for TypeWhisper on Windows.",
    disabled: false,
  },
  {
    href: "#",
    icon: Smartphone,
    title: "iOS",
    description: "Coming soon.",
    disabled: true,
  },
];

export default function DocsIndex() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Documentation
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Choose your platform to get started.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {platforms.map((platform) => {
            const card = (
              <Card
                className={`h-full transition-colors ${
                  platform.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-primary/20"
                }`}
              >
                <CardHeader>
                  <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <platform.icon className="size-4 text-primary" />
                  </div>
                  <CardTitle className="text-base">
                    {platform.title}
                  </CardTitle>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
              </Card>
            );

            if (platform.disabled) {
              return <div key={platform.title}>{card}</div>;
            }

            return (
              <Link key={platform.title} to={platform.href}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </DocsLayout>
  );
}
