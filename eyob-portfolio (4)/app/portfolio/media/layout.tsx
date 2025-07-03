import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Media Production Portfolio - Professional Journalism & Content Creation",
  description:
    "Discover Eyob Salemot's media production portfolio featuring 200+ published articles, health summit coverage, and professional journalism across Ethiopian and international media outlets.",
  keywords: [
    "media production",
    "journalism portfolio",
    "content creation",
    "health journalism",
    "Ethiopian media",
    "USS Afrika",
    "press coverage",
    "media consulting",
    "article writing",
    "event coverage",
  ],
  openGraph: {
    title: "Media Production Portfolio - 200+ Published Articles",
    description:
      "Professional journalism and media production with extensive coverage of health, innovation, and community development.",
    images: [
      {
        url: "/images/media-portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Media Production and Journalism Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "https://eyobsalemot.com/portfolio/media",
  },
}

export default function MediaPortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
