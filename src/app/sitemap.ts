import type { MetadataRoute } from "next";
import { legal } from "@/lib/legal";
import { SITE_URL } from "@/lib/stores";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const docs = new Date(legal.updated);
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/terms`, lastModified: docs, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: docs, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/account-deletion`, lastModified: docs, changeFrequency: "yearly", priority: 0.3 },
  ];
}
