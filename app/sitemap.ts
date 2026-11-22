import type { MetadataRoute } from "next";
import { getGuides } from "@/lib/guides";
import { getHomes } from "@/lib/homes";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const paths = [
    "",
    "/homes",
    "/how-it-works",
    "/guides",
    "/fixer-uppers",
    "/sell",
    "/our-story",
    "/contact",
    "/book-a-tour",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/homes" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/homes" ? 0.9 : 0.6,
  }));

  for (const home of getHomes()) {
    entries.push({
      url: `${base}/homes/${home.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const guide of getGuides()) {
    entries.push({
      url: `${base}/guides/${guide.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
