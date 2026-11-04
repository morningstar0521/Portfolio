import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The PRD's original route name keeps working.
  async redirects() {
    return [{ source: "/red-john", destination: "/contact", permanent: true }];
  },
};

export default nextConfig;
