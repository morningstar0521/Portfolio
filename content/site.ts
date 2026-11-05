// Set SITE_URL in the deploy environment (e.g. https://your-domain.com) so canonical
// URLs, the sitemap and Open Graph links point at the real domain.
export const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/case-files", label: "Case Files" },
  { href: "/about", label: "About" },
] as const;

// Web3Forms access key for the contact note. Public by design: it can only deliver messages to Shubh's inbox.
export const web3formsKey = "39fdb981-ae62-45d9-9281-f43cd14d6ca0";
