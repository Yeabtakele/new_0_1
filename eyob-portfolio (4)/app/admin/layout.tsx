"use client"

import type React from "react"

import { AdminAuthProvider } from "@/lib/admin-auth"
import { AdminRouteGuard } from "@/components/admin-route-guard"
import { Sidebar } from "@/components/ui/sidebar"
import { AdminHeader } from "@/components/admin-header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminRouteGuard>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <AdminHeader />
            <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">{children}</main>
          </div>
        </div>
      </AdminRouteGuard>
    </AdminAuthProvider>
  )
}
