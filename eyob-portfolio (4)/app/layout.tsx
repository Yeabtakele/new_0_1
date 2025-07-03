import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Eyob Salemot - Professional Portfolio | Marketing, Media & Tourism Expert",
    template: "%s | Eyob Salemot Portfolio",
  },
  description:
    "Experienced journalist, marketing strategist, and community organizer with 10+ years of expertise in sales, media production, tourism consulting, and community development across Ethiopia and internationally.",
  keywords: [
    "Eyob Salemot",
    "Ethiopian journalist",
    "marketing strategist",
    "media production",
    "tourism consultant",
    "community organizer",
    "Addis Ababa",
    "Ethiopia",
    "Grand Palace tours",
    "Adwa Museum",
    "sales expert",
    "multilingual consultant",
    "African tourism",
    "Ethiopian heritage",
    "business development",
    "content creation",
  ],
  authors: [{ name: "Eyob Salemot", url: "https://eyobsalemot.com" }],
  creator: "Eyob Salemot",
  publisher: "Eyob Salemot",
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
    type: "website",
    locale: "en_US",
    alternateLocale: ["am_ET", "fr_FR", "sw_KE"],
    url: "https://eyobsalemot.com",
    siteName: "Eyob Salemot Portfolio",
    title: "Eyob Salemot - Professional Portfolio | Marketing, Media & Tourism Expert",
    description:
      "Experienced journalist, marketing strategist, and community organizer with 10+ years of expertise in sales, media production, and tourism consulting.",
    images: [
      {
        url: "/images/eyob-professional-og.jpg",
        width: 1200,
        height: 630,
        alt: "Eyob Salemot - Professional Marketing and Media Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eyob Salemot - Professional Portfolio",
    description:
      "Marketing strategist, journalist, and tourism consultant specializing in Ethiopian heritage and business development.",
    images: ["/images/eyob-professional-twitter.jpg"],
    creator: "@eyobsalemot",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://eyobsalemot.com",
    languages: {
      "en-US": "https://eyobsalemot.com",
      "am-ET": "https://eyobsalemot.com/am",
      "fr-FR": "https://eyobsalemot.com/fr",
      "sw-KE": "https://eyobsalemot.com/sw",
    },
  },
  category: "business",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://eyobsalemot.com" />
        <link rel="alternate" hrefLang="en" href="https://eyobsalemot.com" />
        <link rel="alternate" hrefLang="am" href="https://eyobsalemot.com/am" />
        <link rel="alternate" hrefLang="fr" href="https://eyobsalemot.com/fr" />
        <link rel="alternate" hrefLang="sw" href="https://eyobsalemot.com/sw" />
        <link rel="alternate" hrefLang="x-default" href="https://eyobsalemot.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Eyob Salemot",
              jobTitle: "Marketing Strategist, Journalist & Tourism Consultant",
              description:
                "Experienced marketing strategist, journalist, and tourism consultant specializing in Ethiopian heritage, community development, and business growth.",
              url: "https://eyobsalemot.com",
              image: "https://eyobsalemot.com/images/eyob-professional.jpg",
              sameAs: ["https://linkedin.com/in/salesandmarketingmanagersethiopia", "https://twitter.com/eyobsalemot"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Addis Ababa",
                addressCountry: "Ethiopia",
              },
              knowsLanguage: ["English", "Amharic", "French", "Swahili"],
              hasOccupation: {
                "@type": "Occupation",
                name: "Marketing Manager",
                occupationLocation: {
                  "@type": "City",
                  name: "Addis Ababa",
                },
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
