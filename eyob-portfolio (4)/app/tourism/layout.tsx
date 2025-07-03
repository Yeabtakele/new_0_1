import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ethiopian Tourism & Cultural Tours - Addis Ababa Heritage Sites",
  description:
    "Expert-guided tours of Ethiopian heritage sites including Grand Palace, Adwa Victory Museum, National Museum, and authentic cultural experiences in Addis Ababa.",
  keywords: [
    "Ethiopian tourism",
    "Addis Ababa tours",
    "Grand Palace tours",
    "Adwa Victory Museum",
    "National Museum Ethiopia",
    "Ethiopian heritage",
    "cultural tours",
    "tourism consultant",
    "Ethiopian history",
    "Merkato market",
    "Entoto mountain",
    "Holy Trinity Cathedral",
  ],
  openGraph: {
    title: "Ethiopian Tourism & Cultural Tours - Discover Heritage Sites",
    description:
      "Professional guided tours of Ethiopia's most significant historical and cultural attractions in Addis Ababa.",
    images: [
      {
        url: "/images/tourism-portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Ethiopian Tourism and Heritage Tours",
      },
    ],
  },
  alternates: {
    canonical: "https://eyobsalemot.com/tourism",
  },
}

export default function TourismLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
