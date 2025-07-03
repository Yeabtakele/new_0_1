import { NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const locale = searchParams.get("locale") || "en"
    const featured = searchParams.get("featured")

    const response = await strapi.getPortfolioItems(category || undefined, locale)

    let portfolioItems = response.data.map((item) => ({
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      category: item.attributes.category,
      images:
        item.attributes.images?.data.map((img) => ({
          url: img.attributes.url,
          alt: img.attributes.alternativeText || item.attributes.title,
        })) || [],
      videos:
        item.attributes.videos?.data.map((video) => ({
          url: video.attributes.url,
          alt: video.attributes.alternativeText || item.attributes.title,
        })) || [],
      client: item.attributes.client,
      projectDate: item.attributes.projectDate,
      tags: item.attributes.tags || [],
      featured: item.attributes.featured,
      locale: item.attributes.locale,
      publishedAt: item.attributes.publishedAt,
      createdAt: item.attributes.createdAt,
      updatedAt: item.attributes.updatedAt,
    }))

    // Filter by featured if requested
    if (featured === "true") {
      portfolioItems = portfolioItems.filter((item) => item.featured)
    }

    return NextResponse.json({
      success: true,
      portfolioItems,
      meta: response.meta,
    })
  } catch (error) {
    console.error("Portfolio API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch portfolio items",
        portfolioItems: [],
      },
      { status: 500 },
    )
  }
}
