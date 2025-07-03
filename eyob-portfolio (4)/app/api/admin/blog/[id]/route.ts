import { NextResponse } from "next/server"
import { updateBlogPost } from "@/lib/database"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const postData = await request.json()
    const changeSummary = postData.changeSummary || "Updated post"

    const updatedPost = await updateBlogPost(params.id, postData, changeSummary)

    return NextResponse.json({
      success: true,
      post: updatedPost,
    })
  } catch (error) {
    console.error("Update blog post error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update blog post",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Delete version history first
    await client.query("DELETE FROM blog_post_versions WHERE post_id = $1", [params.id])

    // Delete the post
    const result = await client.query("DELETE FROM blog_posts WHERE id = $1 RETURNING *", [params.id])

    if (result.rows.length === 0) {
      await client.query("ROLLBACK")
      return NextResponse.json(
        {
          success: false,
          error: "Post not found",
        },
        { status: 404 },
      )
    }

    await client.query("COMMIT")

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    })
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Delete blog post error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete blog post",
      },
      { status: 500 },
    )
  } finally {
    client.release()
  }
}
