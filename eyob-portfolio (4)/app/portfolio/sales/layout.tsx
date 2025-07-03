import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sales & Marketing Portfolio - Proven Results & Case Studies",
  description:
    "Explore Eyob Salemot's sales and marketing portfolio featuring successful campaigns that generated $2.5M+ revenue with 350% average ROI across diverse industries.",
  keywords: [
    "sales portfolio",
    "marketing campaigns",
    "digital marketing",
    "lead generation",
    "ROI optimization",
    "B2B marketing",
    "e-commerce growth",
    "marketing strategy",
    "sales funnel",
    "conversion optimization",
  ],
  openGraph: {
    title: "Sales & Marketing Portfolio - $2.5M+ Revenue Generated",
    description: "Proven marketing campaigns and sales strategies with exceptional results across multiple industries.",
    images: [
      {
        url: "/images/sales-portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sales and Marketing Portfolio Results",
      },
    ],
  },
  alternates: {
    canonical: "https://eyobsalemot.com/portfolio/sales",
  },
}

export default function SalesPortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
