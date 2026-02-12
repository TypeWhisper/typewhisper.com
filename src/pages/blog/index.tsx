import { Badge } from "@/components/ui/badge";

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Blog & Changelog
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Updates, release notes, and announcements.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-card p-8 text-center">
        <Badge variant="secondary" className="mb-4">
          Coming Soon
        </Badge>
        <p className="text-muted-foreground">
          The blog is under construction. In the meantime, check the{" "}
          <a
            href="https://github.com/TypeWhisper/typewhisper-mac/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub Releases
          </a>{" "}
          for the latest updates.
        </p>
      </div>
    </div>
  );
}
