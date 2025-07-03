import { NextResponse } from "next/server"
import { getAdminUser, updateAdminUser } from "@/lib/database"

export async function POST() {
  try {
    // Update admin user to disable 2FA
    const adminUser = await getAdminUser("admin")
    if (adminUser) {
      await updateAdminUser(adminUser.id, {
        two_factor_secret: null,
        two_factor_enabled: false,
      })
    }

    return NextResponse.json({
      success: true,
      message: "2FA disabled successfully",
    })
  } catch (error) {
    console.error("2FA disable error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to disable 2FA",
      },
      { status: 500 },
    )
  }
}
