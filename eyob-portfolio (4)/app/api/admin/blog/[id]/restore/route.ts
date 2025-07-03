import { NextResponse } from "next/server"
import { restoreBlogPostVersion } from "@/lib/database"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { version } = await request.json()

    if (!version || typeof version !== "number") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid version number",
        },
        { status: 400 },
      )
    }

    const restoredPost = await restoreBlogPostVersion(params.id, version)

    return NextResponse.json({
      success: true,
      post: restoredPost,
    })
  } catch (error) {
    console.error("Restore blog post version error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to restore version",
      },
      { status: 500 },
    )
  }
}
