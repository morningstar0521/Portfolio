// Set SITE_URL in the deploy environment (e.g. https://your-domain.com) so canonical
// URLs, the sitemap and Open Graph links point at the real domain.
export const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/case-files", label: "Case Files" },
  { href: "/about", label: "About" },
] as const;
