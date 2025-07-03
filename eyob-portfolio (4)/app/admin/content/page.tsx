"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ImageIcon, User, Home, Mail, Download, Upload, Trash2 } from "lucide-react"
import { LivePortfolioEditor } from "@/components/admin/live-portfolio-editor"
import { LiveArticleEditor } from "@/components/admin/live-article-editor"
import { LiveAboutEditor } from "@/components/admin/live-about-editor"
import { LiveContactEditor } from "@/components/admin/live-contact-editor"
import { LiveHomeEditor } from "@/components/admin/live-home-editor"
import { liveContentManager } from "@/lib/live-content-manager"

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState("portfolio")

  const handleExportAll = () => {
    const data = liveContentManager.exportAllContent()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `website-content-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportAll = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          if (liveContentManager.importAllContent(content)) {
            alert("Content imported successfully!")
            window.location.reload()
          } else {
            alert("Failed to import content. Please check the file format.")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear ALL content? This cannot be undone!")) {
      liveContentManager.clearAllContent()
      alert("All content cleared!")
      window.location.reload()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-blue-600" />
            Content Management
          </h1>
          <p className="text-gray-600">Manage all website content from one place</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" onClick={handleImportAll}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportAll}>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearAll}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Content Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="portfolio" className="flex items-center space-x-2">
            <ImageIcon className="h-4 w-4" />
            <span>Portfolio</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Articles</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>About</span>
          </TabsTrigger>
          <TabsTrigger value="home" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Contact</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <LivePortfolioEditor />
        </TabsContent>

        <TabsContent value="articles">
          <LiveArticleEditor />
        </TabsContent>

        <TabsContent value="about">
          <LiveAboutEditor />
        </TabsContent>

        <TabsContent value="home">
          <LiveHomeEditor />
        </TabsContent>

        <TabsContent value="contact">
          <LiveContactEditor />
        </TabsContent>
      </Tabs>
    </div>
  )
}
