import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://alexrivera.dev",
      lastModified: new Date("2026-11-26"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
