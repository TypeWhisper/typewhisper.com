import { useSyncExternalStore } from "react";

const urlChangeEvent = "typewhisper:url-change";

/** Observe navigation and the site's explicit updates to URL-backed controls. */
export function subscribeToPageUrl(onChange: () => void) {
  window.addEventListener(urlChangeEvent, onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    window.removeEventListener(urlChangeEvent, onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

/** Replace the current entry and notify other islands, including locale links. */
export function replacePageUrl(url: URL) {
  if (url.href === window.location.href) return;
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(urlChangeEvent));
}

/** Static HTML has no request query; hydration reads the actual browser URL. */
export function usePageUrl() {
  return useSyncExternalStore(
    subscribeToPageUrl,
    () => window.location.href,
    () => "",
  );
}
