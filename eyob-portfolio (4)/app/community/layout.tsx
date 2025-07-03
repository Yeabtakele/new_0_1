import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Community Organizing & Development - Social Impact Projects",
  description:
    "Eyob Salemot's community development work supporting 300+ students, 150+ families through education, employment, and infrastructure projects across Ethiopia.",
  keywords: [
    "community development",
    "social impact",
    "community organizing",
    "Ethiopian community",
    "youth development",
    "education support",
    "employment programs",
    "infrastructure development",
    "Better Generation",
    "anti-drug programs",
    "community columnist",
  ],
  openGraph: {
    title: "Community Organizing & Development - 300+ Students Trained",
    description:
      "Comprehensive community development initiatives focused on education, employment, and sustainable social impact.",
    images: [
      {
        url: "/images/community-portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Community Development and Social Impact Projects",
      },
    ],
  },
  alternates: {
    canonical: "https://eyobsalemot.com/community",
  },
}

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
