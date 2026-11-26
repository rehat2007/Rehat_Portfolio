import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { Grain } from "@/components/layout/Grain";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollReveals } from "@/components/motion/ScrollReveals";
import { CommandPalette } from "@/components/ui/CommandPalette";

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Rivera — Frontend Engineer & Creative Developer",
  description:
    "Portfolio of Alex Rivera, a frontend engineer and creative developer building fast, tactile interfaces for the web.",
  metadataBase: new URL("https://alexrivera.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alex Rivera — Frontend Engineer & Creative Developer",
    description: "Interfaces that feel alive.",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f2ea" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <ThemeProvider>
          <ToastProvider>
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <Grain />
            <ScrollProgress />
            <SiteHeader />
            {children}
            <Footer />
            <CommandPalette />
            <SmoothScroll />
            <ScrollReveals />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
