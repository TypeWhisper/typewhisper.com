import type { SVGProps } from "react";

export function MacOSLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      data-platform-logo="macos"
      {...props}
    >
      <path d="M16.365 1.43c0 1.14-.42 2.176-1.147 2.915-.874.89-2.297 1.576-3.53 1.476-.157-1.112.404-2.302 1.122-3.045.79-.823 2.158-1.414 3.555-1.346Zm4.59 16.188c-.387.898-.845 1.726-1.372 2.485-.718 1.03-1.306 1.742-1.767 2.138-.715.65-1.483.982-2.307.998-.591 0-1.304-.168-2.136-.507-.835-.338-1.603-.506-2.305-.506-.735 0-1.524.168-2.366.506-.843.339-1.522.515-2.036.53-.79.033-1.577-.307-2.367-1.019-.505-.438-1.12-1.177-1.846-2.218-.778-1.11-1.417-2.398-1.918-3.864C.538 14.577.28 13.05.28 11.58c0-1.683.363-3.135 1.089-4.352a6.42 6.42 0 0 1 2.306-2.336 6.195 6.195 0 0 1 3.122-.885c.614 0 1.421.19 2.423.566 1 .377 1.642.566 1.926.566.213 0 .936-.226 2.17-.678 1.164-.418 2.147-.592 2.95-.526 2.177.176 3.812 1.036 4.9 2.582-1.947 1.18-2.913 2.832-2.897 4.952.016 1.652.617 3.028 1.8 4.123.536.511 1.134.906 1.798 1.186-.145.42-.298.824-.46 1.222Z" />
    </svg>
  );
}

export function WindowsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      data-platform-logo="windows"
      {...props}
    >
      <path d="M3 5.4 11.2 4.3v7.6H3V5.4Zm0 13.2v-6.4h8.2v7.5L3 18.6Zm9.4-7.5V4.1L21 3v8.9h-8.6Zm0 1.1H21V21l-8.6-1.2v-7.6Z" />
    </svg>
  );
}

export function IOSLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-platform-logo="ios"
      {...props}
    >
      <rect x="7" y="1.75" width="10" height="20.5" rx="2.8" />
      <path d="M10.25 5.2h3.5" />
      <path d="M11.2 18.7h1.6" />
    </svg>
  );
}
