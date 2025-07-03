import { NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get("locale") || "en"
    const category = searchParams.get("category")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

    const filters: Record<string, any> = {
      publishedAt: { $notNull: true },
    }

    if (category) {
      filters.category = { $eq: category }
    }

    const response = await strapi.getBlogPosts({
      populate: ["featured_image", "localizations"],
      filters,
      sort: ["publishedAt:desc"],
      pagination: { page, pageSize },
      locale,
    })

    const posts = response.data.map((post) => ({
      id: post.id,
      title: post.attributes.title,
      slug: post.attributes.slug,
      excerpt: post.attributes.excerpt,
      content: post.attributes.content,
      category: post.attributes.category,
      tags: post.attributes.tags || [],
      author: post.attributes.author,
      featured_image: post.attributes.featured_image?.data
        ? {
            url: post.attributes.featured_image.data.attributes.url,
            alt: post.attributes.featured_image.data.attributes.alternativeText || post.attributes.title,
          }
        : null,
      locale: post.attributes.locale,
      localizations:
        post.attributes.localizations?.data.map((loc) => ({
          locale: loc.attributes.locale,
          slug: loc.attributes.slug,
        })) || [],
      publishedAt: post.attributes.publishedAt,
      createdAt: post.attributes.createdAt,
      updatedAt: post.attributes.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      posts,
      meta: response.meta,
    })
  } catch (error) {
    console.error("Blog API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog posts",
        posts: [],
      },
      { status: 500 },
    )
  }
}
