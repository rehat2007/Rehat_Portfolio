"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function ThemeQuery() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("theme");
    if (param === "light" || param === "dark") setTheme(param);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      storageKey="ar-theme"
      disableTransitionOnChange={false}
    >
      <ThemeQuery />
      {children}
    </NextThemesProvider>
  );
}
