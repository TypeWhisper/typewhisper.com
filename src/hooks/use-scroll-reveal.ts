import { useEffect } from "react";

const revealClasses = [
  { hidden: "reveal-hidden", visible: "reveal-visible" },
  { hidden: "reveal-fade-hidden", visible: "reveal-fade-visible" },
  { hidden: "reveal-scale-hidden", visible: "reveal-scale-visible" },
];

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            for (const { hidden, visible } of revealClasses) {
              if (entry.target.classList.contains(hidden)) {
                entry.target.classList.add(visible);
                entry.target.classList.remove(hidden);
                break;
              }
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const selector = revealClasses.map((c) => `.${c.hidden}`).join(", ");
    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
