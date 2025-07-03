import { NextResponse } from "next/server"
import { authenticator } from "otplib"
import { getAdminUser, updateAdminUser } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const { secret, token } = await request.json()

    if (!secret || !token) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing secret or token",
        },
        { status: 400 },
      )
    }

    // Verify the token
    const isValid = authenticator.verify({ token, secret })

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid verification code",
        },
        { status: 400 },
      )
    }

    // Update admin user with 2FA secret
    const adminUser = await getAdminUser("admin")
    if (adminUser) {
      await updateAdminUser(adminUser.id, {
        two_factor_secret: secret,
        two_factor_enabled: true,
      })
    }

    return NextResponse.json({
      success: true,
      message: "2FA enabled successfully",
    })
  } catch (error) {
    console.error("2FA verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to verify 2FA",
      },
      { status: 500 },
    )
  }
}
