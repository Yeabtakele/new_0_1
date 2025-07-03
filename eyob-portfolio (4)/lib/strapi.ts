interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiEntity {
  id: number
  attributes: Record<string, any>
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

class StrapiAPI {
  private baseURL: string
  private apiToken: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    this.apiToken = process.env.STRAPI_API_TOKEN || ""
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<StrapiResponse<T>> {
    const url = `${this.baseURL}/api${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Strapi API request failed:", error)
      throw error
    }
  }

  // Blog Posts
  async getBlogPosts(params?: {
    populate?: string[]
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page: number; pageSize: number }
    locale?: string
  }) {
    const searchParams = new URLSearchParams()

    if (params?.populate) {
      searchParams.append("populate", params.populate.join(","))
    }

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, value)
      })
    }

    if (params?.sort) {
      params.sort.forEach((sortField) => {
        searchParams.append("sort", sortField)
      })
    }

    if (params?.pagination) {
      searchParams.append("pagination[page]", params.pagination.page.toString())
      searchParams.append("pagination[pageSize]", params.pagination.pageSize.toString())
    }

    if (params?.locale) {
      searchParams.append("locale", params.locale)
    }

    const queryString = searchParams.toString()
    const endpoint = `/blog-posts${queryString ? `?${queryString}` : ""}`

    return this.request<StrapiEntity[]>(endpoint)
  }

  async getBlogPost(slug: string, locale?: string) {
    const params = new URLSearchParams({
      "filters[slug][$eq]": slug,
      populate: "*",
    })

    if (locale) {
      params.append("locale", locale)
    }

    const response = await this.request<StrapiEntity[]>(`/blog-posts?${params}`)
    return response.data[0] || null
  }

  async createBlogPost(data: any) {
    return this.request<StrapiEntity>("/blog-posts", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
  }

  async updateBlogPost(id: number, data: any) {
    return this.request<StrapiEntity>(`/blog-posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    })
  }

  async deleteBlogPost(id: number) {
    return this.request(`/blog-posts/${id}`, {
      method: "DELETE",
    })
  }

  // Bookings
  async getBookings(params?: {
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page: number; pageSize: number }
  }) {
    const searchParams = new URLSearchParams()

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, value)
      })
    }

    if (params?.sort) {
      params.sort.forEach((sortField) => {
        searchParams.append("sort", sortField)
      })
    }

    if (params?.pagination) {
      searchParams.append("pagination[page]", params.pagination.page.toString())
      searchParams.append("pagination[pageSize]", params.pagination.pageSize.toString())
    }

    const queryString = searchParams.toString()
    const endpoint = `/bookings${queryString ? `?${queryString}` : ""}`

    return this.request<StrapiEntity[]>(endpoint)
  }

  async createBooking(data: any) {
    return this.request<StrapiEntity>("/bookings", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
  }

  async updateBooking(id: number, data: any) {
    return this.request<StrapiEntity>(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    })
  }

  // Contacts
  async createContact(data: any) {
    return this.request<StrapiEntity>("/contacts", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
  }

  async getContacts(params?: {
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page: number; pageSize: number }
  }) {
    const searchParams = new URLSearchParams()

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, value)
      })
    }

    if (params?.sort) {
      params.sort.forEach((sortField) => {
        searchParams.append("sort", sortField)
      })
    }

    if (params?.pagination) {
      searchParams.append("pagination[page]", params.pagination.page.toString())
      searchParams.append("pagination[pageSize]", params.pagination.pageSize.toString())
    }

    const queryString = searchParams.toString()
    const endpoint = `/contacts${queryString ? `?${queryString}` : ""}`

    return this.request<StrapiEntity[]>(endpoint)
  }

  // Media/Portfolio
  async getPortfolioItems(category?: string, locale?: string) {
    const params = new URLSearchParams({
      populate: "*",
      sort: "createdAt:desc",
    })

    if (category) {
      params.append("filters[category][$eq]", category)
    }

    if (locale) {
      params.append("locale", locale)
    }

    return this.request<StrapiEntity[]>(`/portfolio-items?${params}`)
  }

  async createPortfolioItem(data: any) {
    return this.request<StrapiEntity>("/portfolio-items", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
  }

  // Testimonials
  async getTestimonials(locale?: string) {
    const params = new URLSearchParams({
      populate: "*",
      sort: "createdAt:desc",
      "filters[published][$eq]": "true",
    })

    if (locale) {
      params.append("locale", locale)
    }

    return this.request<StrapiEntity[]>(`/testimonials?${params}`)
  }

  async createTestimonial(data: any) {
    return this.request<StrapiEntity>("/testimonials", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
  }

  // Site Settings
  async getSiteSettings(locale?: string) {
    const params = new URLSearchParams({
      populate: "*",
    })

    if (locale) {
      params.append("locale", locale)
    }

    const response = await this.request<StrapiEntity[]>(`/site-setting?${params}`)
    return response.data[0] || null
  }

  async updateSiteSettings(data: any) {
    // Assuming site settings is a single-type in Strapi
    return this.request<StrapiEntity>("/site-setting", {
      method: "PUT",
      body: JSON.stringify({ data }),
    })
  }

  // File Upload
  async uploadFile(file: File, refId?: string, ref?: string, field?: string) {
    const formData = new FormData()
    formData.append("files", file)

    if (refId) formData.append("refId", refId)
    if (ref) formData.append("ref", ref)
    if (field) formData.append("field", field)

    return fetch(`${this.baseURL}/api/upload`, {
      method: "POST",
      headers: {
        ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
      },
      body: formData,
    }).then((res) => res.json())
  }

  // Authentication (for admin users)
  async login(identifier: string, password: string) {
    return fetch(`${this.baseURL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    }).then((res) => res.json())
  }

  async register(username: string, email: string, password: string) {
    return fetch(`${this.baseURL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((res) => res.json())
  }

  async getMe(jwt: string) {
    return fetch(`${this.baseURL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => res.json())
  }
}

export const strapi = new StrapiAPI()

// Type definitions for Strapi entities
export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: {
    data: {
      id: number
      attributes: {
        url: string
        alternativeText?: string
        caption?: string
      }
    }
  }
  category: string
  tags?: string[]
  author: string
  published: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string
  }
  locale: string
  localizations?: {
    data: Array<{
      id: number
      attributes: {
        locale: string
        title: string
        slug: string
      }
    }>
  }
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface Booking {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  country?: string
  tourType: string
  groupSize: number
  selectedDate: string
  timeSlot: string
  specialRequests?: string
  language?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  service: string
  message: string
  status: "new" | "responded" | "closed"
  createdAt: string
}

export interface PortfolioItem {
  id: number
  title: string
  description?: string
  category: "sales" | "media" | "community" | "tourism"
  images?: {
    data: Array<{
      id: number
      attributes: {
        url: string
        alternativeText?: string
      }
    }>
  }
  videos?: {
    data: Array<{
      id: number
      attributes: {
        url: string
        alternativeText?: string
      }
    }>
  }
  client?: string
  projectDate?: string
  tags?: string[]
  featured: boolean
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface Testimonial {
  id: number
  name: string
  position?: string
  company?: string
  content: string
  rating?: number
  avatar?: {
    data: {
      id: number
      attributes: {
        url: string
        alternativeText?: string
      }
    }
  }
  published: boolean
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface SiteSettings {
  id: number
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address?: string
  socialMedia?: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    youtube?: string
  }
  seo?: {
    defaultMetaTitle?: string
    defaultMetaDescription?: string
    defaultKeywords?: string
  }
  logo?: {
    data: {
      id: number
      attributes: {
        url: string
        alternativeText?: string
      }
    }
  }
  favicon?: {
    data: {
      id: number
      attributes: {
        url: string
      }
    }
  }
  locale: string
  updatedAt: string
}
