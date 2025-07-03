import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Get In Touch for Marketing, Media & Tourism Services",
  description:
    "Contact Eyob Salemot for professional marketing, media production, and tourism consulting services. Available in English, Amharic, French, and Swahili.",
  keywords: [
    "contact Eyob Salemot",
    "marketing consultation",
    "media services",
    "tourism consulting",
    "business consultation",
    "Addis Ababa consultant",
    "multilingual services",
    "professional services",
  ],
  openGraph: {
    title: "Contact Eyob Salemot - Professional Consultation Services",
    description:
      "Get in touch for expert marketing, media, and tourism consulting services across Ethiopia and internationally.",
    images: [
      {
        url: "/images/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Eyob Salemot for Professional Services",
      },
    ],
  },
  alternates: {
    canonical: "https://eyobsalemot.com/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
