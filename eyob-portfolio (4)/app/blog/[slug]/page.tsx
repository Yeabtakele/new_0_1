"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, User, Tag, ArrowLeft, AlertCircle, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/hooks/use-language"

interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  featured_image?: {
    url: string
    alt: string
  }
  seo: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string
  }
  locale: string
  localizations: Array<{
    locale: string
    slug: string
  }>
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export default function BlogPostPage() {
  const params = useParams()
  const { language } = useLanguage()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug, language])

  const fetchPost = async (slug: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/blog/${slug}?locale=${language}`)

      if (!response.ok) {
        if (response.status === 404) {
          setError("Post not found")
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return
      }

      const data = await response.json()

      if (data.success) {
        setPost(data.post)

        // Update page title and meta tags
        if (data.post.seo?.metaTitle) {
          document.title = data.post.seo.metaTitle
        } else {
          document.title = data.post.title
        }

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription && data.post.seo?.metaDescription) {
          metaDescription.setAttribute("content", data.post.seo.metaDescription)
        }
      } else {
        setError(data.error || "Post not found")
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      setError("Failed to load blog post. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const sharePost = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading article...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button asChild>
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article */}
          <Card>
            {post.featured_image && (
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={post.featured_image.url || "/placeholder.svg"}
                  alt={post.featured_image.alt}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            )}

            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                  <Button variant="outline" size="sm" onClick={sharePost}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              <CardTitle className="text-3xl mb-4">{post.title}</CardTitle>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent>
              <div className="prose prose-lg max-w-none">
                {post.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-gray-900">
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <p key={index} className="font-semibold mb-4 text-gray-900">
                        {paragraph.replace(/\*\*/g, "")}
                      </p>
                    )
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="mb-2 text-gray-700">
                        {paragraph.replace("- ", "")}
                      </li>
                    )
                  }
                  if (paragraph.trim() === "") {
                    return <br key={index} />
                  }
                  return (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Language Versions */}
          {post.localizations && post.localizations.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Available in Other Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.localizations.map((localization) => (
                    <Button key={localization.locale} variant="outline" asChild>
                      <Link href={`/blog/${localization.slug}?lang=${localization.locale}`}>
                        {localization.locale.toUpperCase()}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    Tourism
                  </Badge>
                  <h4 className="font-semibold mb-2">Exploring Ethiopian Highlands</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Discover the breathtaking landscapes and rich culture of Ethiopia's highland regions.
                  </p>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    Culture
                  </Badge>
                  <h4 className="font-semibold mb-2">Traditional Ethiopian Festivals</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Learn about the vibrant festivals that celebrate Ethiopian heritage and traditions.
                  </p>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
