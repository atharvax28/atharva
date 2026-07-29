import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { profile } from "@/data/profile";

/* Three roles: a characterful display face, a quiet body face, and a data face. */
const clashGrotesk = localFont({
  src: "../../public/fonts/ClashGrotesk-Variable.ttf",
  variable: "--font-clash-grotesk",
  display: "swap",
});

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const description =
  "Atharva Tayade — Software engineer in Mumbai building data pipelines, ML services, scraping engines, and the web platforms around them.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: "Atharva Tayade — Software Engineer | Data Pipelines & ML",
    template: "%s — Atharva Tayade",
  },
  description,
  keywords: [
    "Atharva Tayade",
    "software engineer",
    "Mumbai developer",
    "data pipelines",
    "machine learning",
    "web scraping",
    "full stack developer",
    "FastAPI",
    "Python",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Atharva Tayade", url: profile.site }],
  creator: "Atharva Tayade",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Atharva Tayade — Software Engineer",
    description,
    url: profile.site,
    siteName: "Atharva Tayade",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Tayade — Software Engineer",
    description,
    creator: "@atharvax28",
  },
  alternates: {
    canonical: profile.site,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              url: profile.site,
              email: profile.email,
              jobTitle: "Software Engineer",
              description,
              knowsAbout: [
                "Data Pipelines",
                "Machine Learning",
                "Web Scraping",
                "Python",
                "FastAPI",
                "React",
                "Next.js",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Mumbai",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mumbai",
                addressCountry: "IN",
              },
              sameAs: [profile.github, profile.linkedin],
            }),
          }}
        />
      </head>
      <body
        className={`${clashGrotesk.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <CustomCursor />
          <SpeedInsights />
          <Analytics />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
