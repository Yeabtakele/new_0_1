"use client"

import { useState, useEffect } from "react"
import { strapi } from "@/lib/strapi"

export function useBlogPosts(params?: {
  category?: string
  locale?: string
  page?: number
  pageSize?: number
}) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [meta, setMeta] = useState<any>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        const filters: any = {
          publishedAt: { $notNull: true },
        }

        if (params?.category) {
          filters.category = { $eq: params.category }
        }

        const response = await strapi.getBlogPosts({
          populate: ["featured_image", "localizations"],
          filters,
          sort: ["publishedAt:desc"],
          pagination: {
            page: params?.page || 1,
            pageSize: params?.pageSize || 10,
          },
          locale: params?.locale || "en",
        })

        setPosts(response.data)
        setMeta(response.meta)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [params?.category, params?.locale, params?.page, params?.pageSize])

  return { posts, loading, error, meta }
}

export function useBlogPost(slug: string, locale = "en") {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await strapi.getBlogPost(slug, locale)
        setPost(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch post")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug, locale])

  return { post, loading, error }
}

export function usePortfolioItems(category?: string, locale = "en") {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await strapi.getPortfolioItems(category, locale)
        setItems(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch portfolio items")
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [category, locale])

  return { items, loading, error }
}

export function useTestimonials(locale = "en") {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await strapi.getTestimonials(locale)
        setTestimonials(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch testimonials")
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [locale])

  return { testimonials, loading, error }
}

export function useSiteSettings(locale = "en") {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await strapi.getSiteSettings(locale)
        setSettings(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch site settings")
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [locale])

  return { settings, loading, error }
}
