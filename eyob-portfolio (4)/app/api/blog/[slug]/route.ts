import { NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get("locale") || "en"

    const post = await strapi.getBlogPost(params.slug, locale)

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: "Post not found",
        },
        { status: 404 },
      )
    }

    const formattedPost = {
      id: post.id,
      title: post.attributes.title,
      slug: post.attributes.slug,
      content: post.attributes.content,
      excerpt: post.attributes.excerpt,
      category: post.attributes.category,
      tags: post.attributes.tags || [],
      author: post.attributes.author,
      featured_image: post.attributes.featured_image?.data
        ? {
            url: post.attributes.featured_image.data.attributes.url,
            alt: post.attributes.featured_image.data.attributes.alternativeText || post.attributes.title,
          }
        : null,
      seo: post.attributes.seo || {},
      locale: post.attributes.locale,
      localizations:
        post.attributes.localizations?.data.map((loc) => ({
          locale: loc.attributes.locale,
          slug: loc.attributes.slug,
        })) || [],
      publishedAt: post.attributes.publishedAt,
      createdAt: post.attributes.createdAt,
      updatedAt: post.attributes.updatedAt,
    }

    return NextResponse.json({
      success: true,
      post: formattedPost,
    })
  } catch (error) {
    console.error("Blog post API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog post",
      },
      { status: 500 },
    )
  }
}
