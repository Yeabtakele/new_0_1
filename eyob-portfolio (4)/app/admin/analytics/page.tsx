"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Download, Trash2, TrendingUp, MessageSquare, Users, Clock, RefreshCw } from "lucide-react"
import { chatbotAnalytics } from "@/lib/chatbot-analytics"

interface AnalyticsData {
  totalSessions: number
  totalQuestions: number
  averageQuestionsPerSession: number
  topQuestions: Array<{
    question: string
    category: string
    count: number
    percentage: number
    lastAsked: Date
  }>
  topCategories: Array<{
    category: string
    count: number
    percentage: number
  }>
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = () => {
      setIsLoading(true)
      const data = chatbotAnalytics.getSessionStats()
      setAnalytics(data)
      setIsLoading(false)
    }

    loadAnalytics()
  }, [refreshKey])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleExport = () => {
    const data = chatbotAnalytics.exportAnalytics()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chatbot-analytics-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all analytics data? This cannot be undone.")) {
      chatbotAnalytics.clearAnalytics()
      setRefreshKey((prev) => prev + 1)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Services: "bg-blue-100 text-blue-800",
      Scheduling: "bg-green-100 text-green-800",
      Pricing: "bg-yellow-100 text-yellow-800",
      Experience: "bg-purple-100 text-purple-800",
      "Story Tips": "bg-red-100 text-red-800",
      Contact: "bg-indigo-100 text-indigo-800",
      Greeting: "bg-gray-100 text-gray-800",
      Other: "bg-orange-100 text-orange-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-8 w-8 mr-3 text-blue-600" />
            Chatbot Analytics
          </h1>
          <p className="text-gray-600">Monitor user engagement and popular questions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Data
          </Button>
        </div>
      </div>

      {analytics && (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-3xl font-bold">{analytics.totalSessions}</p>
                <p className="text-sm text-gray-600">Total Sessions</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-3xl font-bold">{analytics.totalQuestions}</p>
                <p className="text-sm text-gray-600">Total Questions</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-3xl font-bold">{analytics.averageQuestionsPerSession.toFixed(1)}</p>
                <p className="text-sm text-gray-600">Avg Questions/Session</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-3xl font-bold">
                  {analytics.topQuestions.length > 0
                    ? new Date(analytics.topQuestions[0].lastAsked).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-600">Last Activity</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Categories */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Question Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topCategories.map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-6">#{index + 1}</span>
                      <Badge className={getCategoryColor(category.category)}>{category.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-40 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-20 text-right">
                        {category.count} ({category.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Questions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Most Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topQuestions.map((question, index) => (
                  <div key={question.question} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg font-bold text-blue-600">#{index + 1}</span>
                          <Badge className={getCategoryColor(question.category)} variant="secondary">
                            {question.category}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium capitalize text-gray-900">{question.question}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{question.count}</p>
                        <p className="text-sm text-gray-600">{question.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Last asked: {new Date(question.lastAsked).toLocaleString()}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${question.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Insights & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topCategories.length > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-900 mb-2">
                      🎯 Most Popular Topic: {analytics.topCategories[0].category}
                    </p>
                    <p className="text-blue-800 text-sm">
                      {analytics.topCategories[0].percentage.toFixed(1)}% of all questions are about{" "}
                      {analytics.topCategories[0].category.toLowerCase()}. Consider expanding this section on your
                      website.
                    </p>
                  </div>
                )}

                {analytics.averageQuestionsPerSession > 3 && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-900 mb-2">📈 High Engagement</p>
                    <p className="text-green-800 text-sm">
                      Users ask an average of {analytics.averageQuestionsPerSession.toFixed(1)} questions per session,
                      indicating strong interest in your services.
                    </p>
                  </div>
                )}

                {analytics.topQuestions.length > 0 && analytics.topQuestions[0].count > 5 && (
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="font-semibold text-yellow-900 mb-2">❓ Frequently Asked Question</p>
                    <p className="text-yellow-800 text-sm">
                      "{analytics.topQuestions[0].question}" has been asked {analytics.topQuestions[0].count} times.
                      Consider adding this to your FAQ or homepage.
                    </p>
                  </div>
                )}

                {analytics.totalSessions === 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-2">📊 No Data Yet</p>
                    <p className="text-gray-700 text-sm">
                      Start using the chatbot to see analytics data. Visit your website and ask some questions to
                      generate insights.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
