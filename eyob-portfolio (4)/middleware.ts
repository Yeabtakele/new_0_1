import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin-token")?.value
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url))

    try {
      await verifyToken(token) // throws if invalid/expired
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ["/admin/:path*"] }
