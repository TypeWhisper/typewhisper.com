import { Link } from "react-router";
import {
  Mail,
  MessageCircle,
  Code,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type UseCase, categoryLabels } from "@/data/use-cases";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  MessageCircle,
  Code,
  ClipboardList,
};

interface UseCaseCardProps {
  useCase: UseCase;
}

export function UseCaseCard({ useCase }: UseCaseCardProps) {
  const Icon = iconMap[useCase.icon];

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
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
            <div>
              <CardTitle className="text-base">{useCase.name}</CardTitle>
            </div>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {categoryLabels[useCase.category]}
          </Badge>
        </div>
        <CardDescription className="mt-2">
          {useCase.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to={`/use-cases/${useCase.slug}`}>
            Learn More <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
