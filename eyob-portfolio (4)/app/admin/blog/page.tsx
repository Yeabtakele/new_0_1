"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  History,
  FileText,
  Calendar,
  User,
  Tag,
  Search,
  Filter,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RichTextEditor } from "@/components/rich-text-editor"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  featured_image?: string
  published: boolean
  version: number
  created_at: string
  updated_at: string
}

interface BlogPostVersion {
  id: string
  post_id: string
  version: number
  title: string
  content: string
  excerpt: string
  author: string
  created_at: string
  change_summary?: string
}

export default function AdminBlogPage() {
  const { toast } = useToast()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [postVersions, setPostVersions] = useState<BlogPostVersion[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Eyob Salemot",
    category: "",
    tags: [] as string[],
    featured_image: "",
    published: false,
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, statusFilter])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      const data = await response.json()
      if (data.success) {
        setPosts(data.posts)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (statusFilter !== "all") {
      const isPublished = statusFilter === "published"
      filtered = filtered.filter((post) => post.published === isPublished)
    }

    setFilteredPosts(filtered)
  }

  const handleCreatePost = () => {
    setSelectedPost(null)
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "Eyob Salemot",
      category: "",
      tags: [],
      featured_image: "",
      published: false,
    })
    setIsEditing(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags,
      featured_image: post.featured_image || "",
      published: post.published,
    })
    setIsEditing(true)
  }

  const handleSavePost = async (isDraft = false) => {
    try {
      const postData = {
        ...formData,
        published: !isDraft && formData.published,
        tags: Array.isArray(formData.tags)
          ? formData.tags
          : formData.tags
              .toString()
              .split(",")
              .map((tag) => tag.trim()),
      }

      const url = selectedPost ? `/api/admin/blog/${selectedPost.id}` : "/api/admin/blog"
      const method = selectedPost ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: isDraft ? "Draft Saved" : "Post Saved",
          description: `Blog post has been ${isDraft ? "saved as draft" : "saved successfully"}`,
        })
        setIsEditing(false)
        fetchPosts()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to save post",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive",
      })
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Post Deleted",
          description: "Blog post has been deleted successfully",
        })
        fetchPosts()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete post",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      })
    }
  }

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...post,
          published: !post.published,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: post.published ? "Post Unpublished" : "Post Published",
          description: `Post has been ${post.published ? "unpublished" : "published"} successfully`,
        })
        fetchPosts()
      } else {
        toast({
          title: "Error",
          description: "Failed to update post status",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      })
    }
  }

  const fetchVersionHistory = async (postId: string) => {
    try {
      const response = await fetch(`/api/admin/blog/${postId}/versions`)
      const data = await response.json()
      if (data.success) {
        setPostVersions(data.versions)
        setShowVersionHistory(true)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch version history",
        variant: "destructive",
      })
    }
  }

  const handleRestoreVersion = async (postId: string, version: number) => {
    if (!confirm(`Are you sure you want to restore to version ${version}?`)) return

    try {
      const response = await fetch(`/api/admin/blog/${postId}/restore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Version Restored",
          description: `Post has been restored to version ${version}`,
        })
        fetchPosts()
        setShowVersionHistory(false)
      } else {
        toast({
          title: "Error",
          description: "Failed to restore version",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restore version",
        variant: "destructive",
      })
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const categories = ["Tourism", "Culture", "Community", "Business", "Technology"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600">Create and manage blog posts with rich content editing</p>
          </div>
          <Button onClick={handleCreatePost}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {!isEditing ? (
          <>
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Posts</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Drafts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <Badge variant="outline">v{post.version}</Badge>
                        </div>

                        <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {post.category}
                          </div>
                        </div>

                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTogglePublish(post)}
                          className={post.published ? "text-orange-600" : "text-green-600"}
                        >
                          {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => fetchVersionHistory(post.id)}>
                          <History className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or create a new post</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Editor */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedPost ? "Edit Post" : "Create New Post"}</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={() => handleSavePost(true)}>
                  Save Draft
                </Button>
                <Button onClick={() => handleSavePost(false)}>
                  <Save className="h-4 w-4 mr-2" />
                  {formData.published ? "Update & Publish" : "Save & Publish"}
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Title and Slug */}
                <Card>
                  <CardHeader>
                    <CardTitle>Post Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                            slug: prev.slug || generateSlug(e.target.value),
                          }))
                        }}
                        placeholder="Enter post title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                        placeholder="post-url-slug"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Brief description of the post"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Rich Text Editor */}
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                  placeholder="Write your blog post content here..."
                  height="500px"
                />
              </div>

              <div className="space-y-6">
                {/* Publish Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Publish Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <Input
                        value={formData.author}
                        onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <Input
                        value={Array.isArray(formData.tags) ? formData.tags.join(", ") : formData.tags}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tags: e.target.value.split(",").map((tag) => tag.trim()),
                          }))
                        }
                        placeholder="tag1, tag2, tag3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                      <Input
                        value={formData.featured_image}
                        onChange={(e) => setFormData((prev) => ({ ...prev, featured_image: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="published"
                        checked={formData.published}
                        onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="published" className="text-sm font-medium text-gray-700">
                        Publish immediately
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Version History Modal */}
        {showVersionHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Version History</span>
                  <Button variant="outline" onClick={() => setShowVersionHistory(false)}>
                    Close
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                <div className="space-y-4">
                  {postVersions.map((version) => (
                    <Card key={version.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge>Version {version.version}</Badge>
                              <span className="text-sm text-gray-500">
                                {new Date(version.created_at).toLocaleString()}
                              </span>
                            </div>
                            <h4 className="font-semibold mb-1">{version.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{version.change_summary}</p>
                            <p className="text-sm text-gray-500">by {version.author}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRestoreVersion(version.post_id, version.version)}
                          >
                            Restore
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
