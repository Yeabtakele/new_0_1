import { NextResponse } from "next/server"
import { getBlogPostVersions } from "@/lib/database"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const versions = await getBlogPostVersions(params.id)

    return NextResponse.json({
      success: true,
      versions,
    })
  } catch (error) {
    console.error("Get blog post versions error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch version history",
        versions: [],
      },
      { status: 500 },
    )
  }
}
