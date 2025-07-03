import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Profile - Business Graduate & Marketing Expert",
  description:
    "Eyob Salemot's professional profile: Business graduate with 15+ years experience in marketing, community development, media production, and multilingual consulting across Ethiopia.",
  keywords: [
    "professional profile",
    "business graduate",
    "marketing manager",
    "Admas University",
    "multilingual consultant",
    "Ethiopian professional",
    "marketing experience",
    "community leader",
    "media producer",
    "professional CV",
  ],
  openGraph: {
    title: "Professional Profile - 15+ Years Marketing & Media Experience",
    description: "Comprehensive professional background in marketing, media production, and community development.",
    images: [
      {
        url: "/images/eyob-professional.jpg ",
        width: 1200,
        height: 630,
        alt: "Eyob Salemot Professional Profile",
      },
    ],
  },
  alternates: {
    canonical: "https://eyobsalemot.com/profile",
  },
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
