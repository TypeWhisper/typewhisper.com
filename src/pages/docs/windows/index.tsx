import { Link } from "react-router";
import { DocsLayout } from "@/components/layout/docs-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Download, Sparkles, Globe, UserCog } from "lucide-react";

const sections = [
  {
    href: "/docs/windows/installation",
    icon: Download,
    title: "Installation",
    description: "System requirements, download, and first setup.",
  },
  {
    href: "/docs/windows/features",
    icon: Sparkles,
    title: "Features",
    description:
      "Dictation modes, file transcription, translation, and more.",
  },
  {
    href: "/docs/windows/api",
    icon: Globe,
    title: "HTTP API",
    description: "REST API endpoints for external tool integration.",
  },
  {
    href: "/docs/windows/profiles",
    icon: UserCog,
    title: "Profiles",
    description: "App-specific settings for language, engine, and task.",
  },
];

export default function DocsWindowsIndex() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Windows Documentation
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Everything you need to know about TypeWhisper on Windows.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {sections.map((section) => (
            <Link key={section.href} to={section.href}>
              <Card className="h-full hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="size-4 text-primary" />
                  </div>
                  <CardTitle className="text-base">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
