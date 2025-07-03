import { NextResponse } from "next/server"
import { getBlogPosts, createBlogPost } from "@/lib/database"

export async function GET() {
  try {
    // Get all posts (including drafts) for admin
    const publishedPosts = await getBlogPosts(true)
    const draftPosts = await getBlogPosts(false)
    const allPosts = [...publishedPosts, ...draftPosts]

    return NextResponse.json({
      success: true,
      posts: allPosts,
    })
  } catch (error) {
    console.error("Admin blog API error:", error)
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

export async function POST(request: Request) {
  try {
    const postData = await request.json()

    // Generate slug if not provided
    if (!postData.slug) {
      postData.slug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    const post = await createBlogPost(postData)

    return NextResponse.json({
      success: true,
      post,
    })
  } catch (error) {
    console.error("Create blog post error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create blog post",
      },
      { status: 500 },
    )
  }
}
