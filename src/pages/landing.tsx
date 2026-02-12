import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { EngineComparison } from "@/components/landing/engine-comparison";
import { DownloadCTA } from "@/components/landing/download-cta";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function LandingPage() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <EngineComparison />
      <DownloadCTA />
    </>
  );
}
