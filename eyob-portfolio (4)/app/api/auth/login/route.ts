import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/auth"

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  // bcrypt hash for “admin123” (change in production!)
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK",
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (!username || !password) return NextResponse.json({ error: "Missing credentials" }, { status: 400 })

  if (username !== ADMIN_CREDENTIALS.username)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

  const ok = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash)
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

  const token = await signToken({ username, role: "admin" })

  const res = NextResponse.json({ success: true })
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  })
  return res
}
