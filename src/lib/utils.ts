export function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function isExternal(url: string | undefined) {
  return /^https?:/i.test(url ?? "");
}

export function externalLinkProps(url: string | undefined) {
  return isExternal(url) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
