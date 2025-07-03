import React from "react"
import { useAdminAuth } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  const { user, logout } = useAdminAuth()

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <div className="font-bold text-xl text-blue-700">Admin Panel</div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">{user?.name || "Admin"}</span>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>
    </header>
  )
}

export default AdminHeader; 