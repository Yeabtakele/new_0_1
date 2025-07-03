"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, MessageSquare, Users, Calendar, TrendingUp, Eye, FileText, Edit } from "lucide-react"
import Link from "next/link"
import { useAdminAuth } from "@/lib/admin-auth"

export default function AdminDashboardPage() {
  const { user } = useAdminAuth()

  const stats = [
    {
      title: "Total Visitors",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Chat Sessions",
      value: "156",
      change: "+8%",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Meetings Scheduled",
      value: "23",
      change: "+15%",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Page Views",
      value: "8,432",
      change: "+5%",
      icon: Eye,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your portfolio website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Content Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Add, edit, and manage all website content including portfolio items, articles, and pages.
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/content">Manage Content</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">View detailed chatbot analytics and user engagement metrics.</p>
            <Button asChild className="w-full">
              <Link href="/admin/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage scheduled meetings and consultation requests.</p>
            <Button variant="outline" className="w-full bg-transparent">
              View Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Edit className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Content updated</p>
                <p className="text-xs text-gray-600">Portfolio item "Tax Evasion Investigation" modified</p>
              </div>
              <span className="text-xs text-gray-500">5 minutes ago</span>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New chat session started</p>
                <p className="text-xs text-gray-600">User asked about investigative services</p>
              </div>
              <span className="text-xs text-gray-500">2 minutes ago</span>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Meeting scheduled</p>
                <p className="text-xs text-gray-600">30-min consultation for tomorrow</p>
              </div>
              <span className="text-xs text-gray-500">1 hour ago</span>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Analytics milestone</p>
                <p className="text-xs text-gray-600">Reached 100 chat sessions this month</p>
              </div>
              <span className="text-xs text-gray-500">3 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
