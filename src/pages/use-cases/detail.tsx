import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUseCaseModule } from "@/data/use-cases";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { UseCaseHero } from "@/components/use-cases/use-case-hero";
import { UseCaseFeatures } from "@/components/use-cases/use-case-features";
import { UseCaseHowItWorks } from "@/components/use-cases/use-case-how-it-works";
import { UseCaseBenefits } from "@/components/use-cases/use-case-benefits";
import { UseCaseCTA } from "@/components/use-cases/use-case-cta";

export default function UseCaseDetail() {
  const { slug } = useParams();
  const mod = slug ? getUseCaseModule(slug) : undefined;

  useScrollReveal();

  if (!mod) {
    return (
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h1 className="font-display text-2xl font-bold">
            Use case not found
          </h1>
          <p className="mt-2 text-muted-foreground">
            The use case you're looking for doesn't exist.
          </p>
          <Button variant="ghost" size="sm" asChild className="mt-4">
            <Link to="/use-cases">
              <ArrowLeft className="size-4" />
              Back to Use Cases
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const Content = mod.default;
  const useCase = mod.frontmatter;

  return (
    <div>
      <UseCaseHero useCase={useCase} />
      <UseCaseFeatures features={useCase.features} />
      <UseCaseHowItWorks steps={useCase.howItWorks} />
      <UseCaseBenefits benefits={useCase.benefits} />

      {Content && (
        <section className="section-light py-16 sm:py-20">
          <div className="prose prose-neutral dark:prose-invert mx-auto max-w-4xl px-4 sm:px-6">
            <Content />
          </div>
        </section>
      )}

      <UseCaseCTA />
    </div>
  );
}
