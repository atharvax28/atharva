import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://atharvadev.athutayade.workers.dev";

  const projectSlugs = [
    "vri-cred",
    "axiom-designs",
    "developer-reference-hub",
    "aakanksha-tayade",
    "strokes-designs",
    "job-aggregation-pipeline",
    "adaptive-scraping-engine",
    "osint-aggregator",
    "ipl-outcome-prediction",
  ];

  const projectUrls: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectUrls,
  ];
}
