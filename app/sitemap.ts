import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/case-files", "/about", "/contact", ...cases.map((c) => `/case-files/${c.slug}`)];
  return routes.map((r) => ({ url: `${siteUrl}${r}` }));
}
