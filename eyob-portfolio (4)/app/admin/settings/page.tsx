"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TwoFactorAuth } from "@/components/two-factor-auth"
import { Settings, User, Shield, Database, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminSettings {
  username: string
  email: string
  two_factor_enabled: boolean
  site_title: string
  site_description: string
  contact_email: string
  social_links: {
    facebook: string
    twitter: string
    linkedin: string
    instagram: string
  }
}

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<AdminSettings>({
    username: "admin",
    email: "admin@eyobsalemot.com",
    two_factor_enabled: false,
    site_title: "Eyob Salemot - Tourism, Media & Community Solutions",
    site_description:
      "Professional services in tourism, media production, and community development across Ethiopia and East Africa.",
    contact_email: "contact@eyobsalemot.com",
    social_links: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
    },
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      const data = await response.json()
      if (data.success) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    }
  }

  const handleSaveSettings = async (section: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, settings }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Settings Saved",
          description: `${section} settings have been updated successfully`,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to save settings",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggle2FA = (enabled: boolean, secret?: string) => {
    setSettings((prev) => ({
      ...prev,
      two_factor_enabled: enabled,
    }))
  }

  const initializeDatabase = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/database/init", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Database Initialized",
          description: "Database tables have been created successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to initialize database",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize database",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Admin Settings
          </h1>
          <p className="text-gray-600">Manage your admin account and site configuration</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="site" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Site Settings
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <Input
                    value={settings.username}
                    onChange={(e) => setSettings((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="Admin username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="admin@example.com"
                  />
                </div>
                <Button onClick={() => handleSaveSettings("profile")} disabled={loading}>
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <TwoFactorAuth isEnabled={settings.two_factor_enabled} onToggle={handleToggle2FA} />

              <Card>
                <CardHeader>
                  <CardTitle>Password Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button onClick={() => handleSaveSettings("password")} disabled={loading}>
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="site">
            <Card>
              <CardHeader>
                <CardTitle>Site Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                  <Input
                    value={settings.site_title}
                    onChange={(e) => setSettings((prev) => ({ ...prev, site_title: e.target.value }))}
                    placeholder="Site title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                  <textarea
                    value={settings.site_description}
                    onChange={(e) => setSettings((prev) => ({ ...prev, site_description: e.target.value }))}
                    placeholder="Site description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <Input
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => setSettings((prev) => ({ ...prev, contact_email: e.target.value }))}
                    placeholder="contact@example.com"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">Social Media Links</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                      <Input
                        value={settings.social_links.facebook}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            social_links: { ...prev.social_links, facebook: e.target.value },
                          }))
                        }
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                      <Input
                        value={settings.social_links.twitter}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            social_links: { ...prev.social_links, twitter: e.target.value },
                          }))
                        }
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <Input
                        value={settings.social_links.linkedin}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            social_links: { ...prev.social_links, linkedin: e.target.value },
                          }))
                        }
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                      <Input
                        value={settings.social_links.instagram}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            social_links: { ...prev.social_links, instagram: e.target.value },
                          }))
                        }
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleSaveSettings("site")} disabled={loading}>
                  Save Site Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Database Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">Database Initialization</h3>
                  <p className="text-sm text-yellow-700 mb-4">
                    Initialize the database with required tables for blog posts, bookings, contacts, and admin users.
                    This is safe to run multiple times.
                  </p>
                  <Button onClick={initializeDatabase} disabled={loading} variant="outline">
                    {loading ? "Initializing..." : "Initialize Database"}
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Database Status</h3>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>✅ Blog posts table</p>
                    <p>✅ Blog post versions table</p>
                    <p>✅ Bookings table</p>
                    <p>✅ Contacts table</p>
                    <p>✅ Admin users table</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
