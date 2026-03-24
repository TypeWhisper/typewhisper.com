import {
  Mail,
  MessageCircle,
  Code,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type UseCase, categoryLabels } from "@/data/use-cases";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  MessageCircle,
  Code,
  ClipboardList,
};

interface UseCaseCardProps {
  useCase: UseCase;
  basePath?: string;
}

export function UseCaseCard({ useCase, basePath = "/use-cases" }: UseCaseCardProps) {
  const Icon = iconMap[useCase.icon];

  return (
    <a
      href={`${basePath}/${useCase.slug}`}
      className="group block rounded-2xl border bg-card p-6 transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${useCase.color}15` }}
          >
            {Icon && (
              <span style={{ color: useCase.color }}>
                <Icon className="size-5" />
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold">{useCase.name}</h3>
        </div>
        <Badge variant="secondary" className="text-[10px]">
          {categoryLabels[useCase.category]}
        </Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {useCase.description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        Learn More <ArrowRight className="size-4" />
      </div>
    </a>
  );
}
