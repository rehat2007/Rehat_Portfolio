"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/Icons";

const subscribeNoop = () => () => {};
const getMounted = () => true;
const getMountedServer = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, getMounted, getMountedServer);

  useEffect(() => {
    if (!resolvedTheme) return;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", resolvedTheme === "light" ? "#f5f2ea" : "#08090a");
  }, [resolvedTheme]);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.add("theme-transition");
    window.setTimeout(() => html.classList.remove("theme-transition"), 500);
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      className="icon-btn theme-toggle"
      id="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      <Icon name="sun" className="icon icon-sun" />
      <Icon name="moon" className="icon icon-moon" />
    </button>
  );
}
