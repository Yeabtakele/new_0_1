import React, { createContext, useContext, useState, useEffect } from "react"

interface AdminUser {
  name: string
  email: string
}

interface AdminAuthContextProps {
  user: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user from localStorage
    const storedUser = localStorage.getItem("adminUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate login (replace with real API call)
    if (email && password) {
      const fakeUser = { name: "Admin User", email }
      setUser(fakeUser)
      localStorage.setItem("adminUser", JSON.stringify(fakeUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("adminUser")
  }

  return (
    <AdminAuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) throw new Error("useAdminAuth must be used within AdminAuthProvider")
  return context
} 