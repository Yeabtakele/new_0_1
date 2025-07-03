import { NextResponse } from "next/server"
import { authenticator } from "otplib"
import { randomBytes } from "crypto"

export async function POST() {
  try {
    // Generate a secret for 2FA
    const secret = authenticator.generateSecret()

    // Generate QR code URL
    const serviceName = "Eyob Salemot Portfolio"
    const accountName = "admin@eyobsalemot.com"
    const otpAuthUrl = authenticator.keyuri(accountName, serviceName, secret)

    // Generate backup codes
    const backupCodes = Array.from({ length: 8 }, () => randomBytes(4).toString("hex").toUpperCase())

    return NextResponse.json({
      success: true,
      secret,
      qrCodeUrl: otpAuthUrl,
      backupCodes,
    })
  } catch (error) {
    console.error("2FA setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to setup 2FA",
      },
      { status: 500 },
    )
  }
}
