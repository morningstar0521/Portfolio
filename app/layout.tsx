import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/content/site";

// Self-hosted (OFL) copies from @fontsource; no runtime request to Google.
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});
const caveat = localFont({
  src: "./fonts/caveat-latin-wght-normal.woff2",
  variable: "--font-caveat",
  weight: "400 700",
  display: "swap",
});
const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});
const plex = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shubh Ghiya — Software Engineer & Builder",
    template: "%s | Shubh Ghiya",
  },
  description:
    "Explore the case files of Shubh Ghiya: production full-stack engineering, reliable backend systems, developer tools and machine-learning projects.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "The Case Files of Shubh Ghiya",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f4ead5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${caveat.variable} ${manrope.variable} ${plex.variable}`}>
      <head>
        {/* Applies a saved dark choice before first paint, so there is no flash of the light theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="label sr-only z-[70] bg-fg px-4 py-3 text-ground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
