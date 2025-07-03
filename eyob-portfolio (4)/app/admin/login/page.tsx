"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, isLoading, isAuthenticated } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    const success = await login(email, password)
    if (success) {
      router.push("/admin/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Image gallery from public folder only */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          <img src="/placeholder-logo.png" alt="Eyob Portfolio Logo" className="object-cover w-full h-24 rounded shadow" />
          <span className="text-xs mt-1 text-center">Eyob Portfolio Logo</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/placeholder-logo.svg" alt="Eyob Portfolio Logo (SVG)" className="object-cover w-full h-24 rounded shadow" />
          <span className="text-xs mt-1 text-center">Eyob Portfolio Logo (SVG)</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/placeholder-user.jpg" alt="Default User" className="object-cover w-full h-24 rounded shadow" />
          <span className="text-xs mt-1 text-center">Default User</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/placeholder.jpg" alt="Placeholder" className="object-cover w-full h-24 rounded shadow" />
          <span className="text-xs mt-1 text-center">Placeholder Image</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/placeholder.svg" alt="Placeholder (SVG)" className="object-cover w-full h-24 rounded shadow" />
          <span className="text-xs mt-1 text-center">Placeholder SVG</span>
        </div>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center mb-4">
            <img
              src="/placeholder-logo.png"
              alt="Eyob Portfolio Admin Logo"
              width={48}
              height={48}
              className="mb-2 rounded-full"
            />
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <p className="text-gray-600">Access your admin dashboard</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Admin login form">
            {error && (
              <Alert variant="destructive" role="alert">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@saramitchell.com"
                  className="pl-10"
                  required
                  aria-required="true"
                  aria-label="Email Address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                  aria-required="true"
                  aria-label="Password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    aria-label="Remember me"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500" tabIndex={0} aria-label="Forgot password?">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading} aria-label="Sign in">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Demo Credentials:</h4>
            <p className="text-xs text-gray-600">Email: admin@eyob.com</p>
            <p className="text-xs text-gray-600">Password: adminyeab1234</p>
            <p className="text-xs text-red-600 mt-2">⚠️ Change these in production!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
