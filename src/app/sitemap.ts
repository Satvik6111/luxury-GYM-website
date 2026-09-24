import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://limitless.fitness",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://limitless.fitness/trainer",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://limitless.fitness/results",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
