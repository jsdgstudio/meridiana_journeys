import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://meridianajourneys.com";
const OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meridiana — Viajes Culturales por Colombia",
    template: "%s | Meridiana",
  },
  description:
    "Viajes de profundidad cultural por Colombia y América Latina. Narrativa antes que logística.",
  keywords: [
    "viajes culturales Colombia",
    "cultural travel Colombia",
    "tours Colombia",
    "viajes América Latina",
    "turismo cultural",
  ],
  authors: [{ name: "Meridiana" }],
  creator: "Meridiana",
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: "en_US",
    siteName: "Meridiana",
    title: "Meridiana — Viajes Culturales por Colombia",
    description:
      "Viajes de profundidad cultural por Colombia y América Latina. Narrativa antes que logística.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Meridiana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridiana — Viajes Culturales por Colombia",
    description:
      "Viajes de profundidad cultural por Colombia y América Latina. Narrativa antes que logística.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
