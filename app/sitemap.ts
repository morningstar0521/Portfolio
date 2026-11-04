import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/case-files", "/about", "/contact"].map((r) => ({ url: `${siteUrl}${r}` }));
  const files = cases.map((c) => ({ url: `${siteUrl}/case-files/${c.slug}`, lastModified: c.lastVerified }));
  return [...pages, ...files];
}
