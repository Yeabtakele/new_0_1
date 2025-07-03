import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Test Suite - Eyob Salemot Portfolio",
  description: "Comprehensive testing suite for website functionality",
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
