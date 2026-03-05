import { Link } from "react-router";
import {
  Mail,
  MessageCircle,
  Code,
  ClipboardList,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type UseCase, categoryLabels } from "@/data/use-cases";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  MessageCircle,
  Code,
  ClipboardList,
};

interface UseCaseHeroProps {
  useCase: UseCase;
}

export function UseCaseHero({ useCase }: UseCaseHeroProps) {
  const Icon = iconMap[useCase.icon];

  return (
    <section className="section-light py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/use-cases">
            <ArrowLeft className="size-4" />
            All Use Cases
          </Link>
        </Button>

        <div className="mx-auto max-w-3xl text-center">
          <div
            className="reveal-fade-hidden mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${useCase.color}15` }}
          >
            {Icon && (
              <span style={{ color: useCase.color }}>
                <Icon className="size-8" />
              </span>
            )}
          </div>

          <Badge variant="secondary" className="reveal-fade-hidden mb-4">
            {categoryLabels[useCase.category]}
          </Badge>

          <h1 className="reveal-fade-hidden font-display text-3xl font-bold tracking-tight sm:text-5xl">
            {useCase.name}
          </h1>
          <p className="reveal-fade-hidden mt-4 text-lg text-muted-foreground sm:text-xl">
            {useCase.description}
          </p>
        </div>
      </div>
    </section>
  );
}
