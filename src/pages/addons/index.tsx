import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { plugins, type PluginCategory, type PluginPlatform } from "@/data/addons";
import { CategoryFilter } from "@/components/addons/category-filter";
import { PlatformFilter } from "@/components/addons/platform-filter";
import { AddonCard } from "@/components/addons/addon-card";
import { Button } from "@/components/ui/button";

export default function AddonsIndex() {
  const [category, setCategory] = useState<PluginCategory | "all">("all");
  const [platform, setPlatform] = useState<PluginPlatform | "all">("all");

  const filtered = plugins.filter((p) => {
    const matchesCategory =
      category === "all" || p.categories.includes(category);
    const matchesPlatform =
      platform === "all" || p.platforms.includes(platform);
    return matchesCategory && matchesPlatform;
  });

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Add-ons
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Extend TypeWhisper with cloud transcription, LLM providers,
            automations, and more.
          </p>
          <Button variant="link" asChild className="mt-2">
            <Link to="/addons/develop">
              Build your own plugin <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <CategoryFilter selected={category} onChange={setCategory} />
          <PlatformFilter selected={platform} onChange={setPlatform} />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plugin) => (
            <AddonCard key={plugin.slug} plugin={plugin} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No add-ons found for this filter combination.
          </p>
        )}
      </div>
    </div>
  );
}
