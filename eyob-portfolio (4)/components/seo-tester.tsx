"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, Search, Globe } from "lucide-react"

interface SEOTest {
  name: string
  status: "pass" | "fail" | "warning" | "pending"
  description: string
  recommendation?: string
  value?: string
}

export function SEOTester() {
  const [seoTests, setSeoTests] = useState<SEOTest[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runSEOTests = async () => {
    setIsRunning(true)
    const tests: SEOTest[] = []

    // Title Tag Test
    const titleElement = document.querySelector("title")
    const titleText = titleElement?.textContent || ""
    tests.push({
      name: "Title Tag",
      status: titleText.length >= 30 && titleText.length <= 60 ? "pass" : "warning",
      description: `Title length: ${titleText.length} characters`,
      recommendation:
        titleText.length < 30
          ? "Title too short (min 30 chars)"
          : titleText.length > 60
            ? "Title too long (max 60 chars)"
            : undefined,
      value: titleText,
    })

    // Meta Description Test
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute("content") || ""
    tests.push({
      name: "Meta Description",
      status: metaDesc.length >= 120 && metaDesc.length <= 160 ? "pass" : "warning",
      description: `Description length: ${metaDesc.length} characters`,
      recommendation:
        metaDesc.length < 120
          ? "Description too short (min 120 chars)"
          : metaDesc.length > 160
            ? "Description too long (max 160 chars)"
            : undefined,
      value: metaDesc,
    })

    // Keywords Test
    const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute("content") || ""
    tests.push({
      name: "Meta Keywords",
      status: metaKeywords.length > 0 ? "pass" : "warning",
      description: metaKeywords.length > 0 ? `${metaKeywords.split(",").length} keywords found` : "No keywords found",
      value: metaKeywords,
    })

    // Open Graph Tests
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content")
    const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute("content")
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content")
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute("content")

    tests.push({
      name: "Open Graph Title",
      status: ogTitle ? "pass" : "fail",
      description: ogTitle ? "OG title present" : "OG title missing",
      value: ogTitle || undefined,
    })

    tests.push({
      name: "Open Graph Description",
      status: ogDescription ? "pass" : "fail",
      description: ogDescription ? "OG description present" : "OG description missing",
      value: ogDescription || undefined,
    })

    tests.push({
      name: "Open Graph Image",
      status: ogImage ? "pass" : "fail",
      description: ogImage ? "OG image present" : "OG image missing",
      value: ogImage || undefined,
    })

    // Twitter Card Tests
    const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute("content")
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute("content")
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute("content")

    tests.push({
      name: "Twitter Card",
      status: twitterCard ? "pass" : "warning",
      description: twitterCard ? `Twitter card type: ${twitterCard}` : "Twitter card missing",
      value: twitterCard || undefined,
    })

    // Canonical URL Test
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href")
    tests.push({
      name: "Canonical URL",
      status: canonical ? "pass" : "warning",
      description: canonical ? "Canonical URL present" : "Canonical URL missing",
      value: canonical || undefined,
    })

    // Language Tags Test
    const htmlLang = document.documentElement.getAttribute("lang")
    const altLangs = document.querySelectorAll("link[hreflang]")
    tests.push({
      name: "Language Tags",
      status: htmlLang && altLangs.length > 0 ? "pass" : "warning",
      description: `HTML lang: ${htmlLang}, Alt languages: ${altLangs.length}`,
      value: htmlLang || undefined,
    })

    // Structured Data Test
    const structuredData = document.querySelectorAll('script[type="application/ld+json"]')
    tests.push({
      name: "Structured Data",
      status: structuredData.length > 0 ? "pass" : "warning",
      description: `${structuredData.length} structured data blocks found`,
      recommendation: structuredData.length === 0 ? "Add JSON-LD structured data for better SEO" : undefined,
    })

    // Heading Structure Test
    const h1Tags = document.querySelectorAll("h1")
    const h2Tags = document.querySelectorAll("h2")
    const h3Tags = document.querySelectorAll("h3")
    tests.push({
      name: "Heading Structure",
      status: h1Tags.length === 1 && h2Tags.length > 0 ? "pass" : "warning",
      description: `H1: ${h1Tags.length}, H2: ${h2Tags.length}, H3: ${h3Tags.length}`,
      recommendation: h1Tags.length !== 1 ? "Should have exactly one H1 tag per page" : undefined,
    })

    // Image Alt Text Test
    const images = document.querySelectorAll("img")
    const imagesWithAlt = document.querySelectorAll("img[alt]")
    const altTextCoverage = images.length > 0 ? Math.round((imagesWithAlt.length / images.length) * 100) : 100
    tests.push({
      name: "Image Alt Text",
      status: altTextCoverage >= 90 ? "pass" : altTextCoverage >= 70 ? "warning" : "fail",
      description: `${altTextCoverage}% of images have alt text (${imagesWithAlt.length}/${images.length})`,
      recommendation: altTextCoverage < 90 ? "Add alt text to all images for accessibility and SEO" : undefined,
    })

    // Page Speed Indicators
    const performanceEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
    if (performanceEntries.length > 0) {
      const loadTime = performanceEntries[0].loadEventEnd - performanceEntries[0].loadEventStart
      tests.push({
        name: "Page Load Time",
        status: loadTime < 3000 ? "pass" : loadTime < 5000 ? "warning" : "fail",
        description: `Page loaded in ${Math.round(loadTime)}ms`,
        recommendation: loadTime >= 3000 ? "Optimize images and reduce bundle size for faster loading" : undefined,
      })
    }

    // Mobile Viewport Test
    const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute("content")
    tests.push({
      name: "Mobile Viewport",
      status: viewport?.includes("width=device-width") ? "pass" : "fail",
      description: viewport ? "Viewport meta tag present" : "Viewport meta tag missing",
      value: viewport || undefined,
    })

    // Robots Meta Test
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content")
    tests.push({
      name: "Robots Meta",
      status: robots ? "pass" : "warning",
      description: robots ? `Robots directive: ${robots}` : "No robots meta tag found",
      value: robots || undefined,
    })

    setSeoTests(tests)
    setIsRunning(false)
  }

  useEffect(() => {
    runSEOTests()
  }, [])

  const passedTests = seoTests.filter((test) => test.status === "pass").length
  const warningTests = seoTests.filter((test) => test.status === "warning").length
  const failedTests = seoTests.filter((test) => test.status === "fail").length
  const totalTests = seoTests.length
  const seoScore = totalTests > 0 ? Math.round(((passedTests + warningTests * 0.5) / totalTests) * 100) : 0

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "fail":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* SEO Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO Score Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{seoScore}%</div>
              <div className="text-sm text-gray-600">SEO Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{passedTests}</div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{warningTests}</div>
              <div className="text-sm text-gray-600">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">{failedTests}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall SEO Health</span>
              <span>{seoScore}%</span>
            </div>
            <Progress value={seoScore} className="h-3" />
          </div>

          <Button onClick={runSEOTests} disabled={isRunning} className="w-full mt-4">
            {isRunning ? "Running SEO Tests..." : "Refresh SEO Analysis"}
          </Button>
        </CardContent>
      </Card>

      {/* Detailed SEO Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seoTests.map((test, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{test.name}</h4>
                      <p className="text-sm text-gray-600">{test.description}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      test.status === "pass" ? "default" : test.status === "warning" ? "secondary" : "destructive"
                    }
                    className={getStatusColor(test.status)}
                  >
                    {test.status.toUpperCase()}
                  </Badge>
                </div>

                {test.value && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono text-gray-700 break-all">
                    {test.value}
                  </div>
                )}

                {test.recommendation && (
                  <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800">
                    <strong>Recommendation:</strong> {test.recommendation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            SEO Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Technical SEO</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Proper HTML structure with semantic tags</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Mobile-responsive design</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Fast loading times</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>SSL certificate (HTTPS)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Content SEO</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Unique, high-quality content</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Proper keyword optimization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Internal linking strategy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Regular content updates</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
