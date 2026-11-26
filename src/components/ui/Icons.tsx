import type { SVGProps } from "react";

export type IconName =
  | "arrowUpRight"
  | "arrowRight"
  | "arrowUp"
  | "plus"
  | "close"
  | "check"
  | "search"
  | "sun"
  | "moon"
  | "copy"
  | "github"
  | "x"
  | "linkedin"
  | "mail";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number | string;
};

const filled = new Set<IconName>(["github", "x", "linkedin"]);

export function Icon({ name, size, ...props }: IconProps) {
  const isFilled = filled.has(name);

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? undefined : 1.7}
      strokeLinecap={isFilled ? undefined : "round"}
      strokeLinejoin={isFilled ? undefined : "round"}
      aria-hidden="true"
      {...props}
    >
      {name === "arrowUpRight" && <path d="M7 17 17 7M9 7h8v8" />}
      {name === "arrowRight" && <path d="M5 12h14M13 6l6 6-6 6" />}
      {name === "arrowUp" && <path d="M12 19V5M6 11l6-6 6 6" />}
      {name === "plus" && <path d="M12 5v14M5 12h14" />}
      {name === "close" && <path d="M6 6l12 12M18 6 6 18" />}
      {name === "check" && <path d="m4 12 5 5L20 6" />}
      {name === "search" && (
        <>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </>
      )}
      {name === "sun" && (
        <>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </>
      )}
      {name === "moon" && <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />}
      {name === "copy" && (
        <>
          <rect x="9" y="9" width="11" height="11" rx="2.5" />
          <path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5" />
        </>
      )}
      {name === "github" && (
        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
      )}
      {name === "x" && (
        <path d="M18.9 1.2h3.7l-8.1 9.3 9.6 12.3h-7.5l-5.9-7.6-6.7 7.6H.3l8.7-9.9L-.2 1.2h7.7l5.3 6.9 6.1-6.9Zm-1.3 19.4h2L6.3 3.3H4.2l13.4 17.3Z" />
      )}
      {name === "linkedin" && (
        <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.02 8h4.96v16H.02V8Zm7.98 0h4.76v2.2h.07c.66-1.25 2.27-2.57 4.67-2.57 5 0 5.92 3.29 5.92 7.57V24h-4.96v-7.8c0-1.86-.03-4.25-2.59-4.25-2.6 0-3 2.03-3 4.12V24H8V8Z" />
      )}
      {name === "mail" && (
        <>
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
          <path d="m3.5 6.5 8.5 6 8.5-6" />
        </>
      )}
    </svg>
  );
}
