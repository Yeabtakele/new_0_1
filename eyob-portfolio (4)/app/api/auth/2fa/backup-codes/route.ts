import { NextResponse } from "next/server"
import { randomBytes } from "crypto"

export async function POST() {
  try {
    // Generate new backup codes
    const backupCodes = Array.from({ length: 8 }, () => randomBytes(4).toString("hex").toUpperCase())

    // In a real implementation, you would store these codes in the database
    // For now, we'll just return them

    return NextResponse.json({
      success: true,
      backupCodes,
    })
  } catch (error) {
    console.error("Backup codes generation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate backup codes",
      },
      { status: 500 },
    )
  }
}
