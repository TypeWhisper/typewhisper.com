import { DocsLayout } from "@/components/layout/docs-layout";
import { Smartphone } from "lucide-react";

export default function DocsIOS() {
  return (
    <DocsLayout>
      <div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Smartphone className="size-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            iOS
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            iOS support is coming soon. We&apos;re working on bringing
            TypeWhisper to iPhone and iPad.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}
