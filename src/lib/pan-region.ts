/**
 * A panned screenshot scrolls sideways on phones only. While it scrolls it
 * takes the keyboard focus, so the arrow keys can pan it; otherwise it stays
 * out of the tab order. Returns the cleanup, so it serves as a React ref.
 */
export function watchPanRegion(
  element: HTMLElement | null,
): (() => void) | undefined {
  if (!element) return undefined;
  const update = () => {
    const overflow = getComputedStyle(element).overflowX;
    const scrolls =
      (overflow === "auto" || overflow === "scroll") &&
      element.scrollWidth > element.clientWidth + 1;
    if (scrolls) element.tabIndex = 0;
    else element.removeAttribute("tabindex");
  };
  update();
  // The strip changes with the viewport, its content with the platform.
  const observer = new ResizeObserver(update);
  observer.observe(element);
  if (element.firstElementChild) observer.observe(element.firstElementChild);
  return () => observer.disconnect();
}
