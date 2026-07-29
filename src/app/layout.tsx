import type { Metadata } from "next";
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
  "Software engineer in Mumbai building data pipelines, ML services, and the web platforms around them.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: "Atharva Tayade — Software Engineer",
  description,
  openGraph: {
    title: "Atharva Tayade — Software Engineer",
    description,
    url: profile.site,
    siteName: "Atharva Tayade",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Tayade — Software Engineer",
    description,
  },
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
