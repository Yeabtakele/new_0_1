"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  height = "400px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [activeTab, setActiveTab] = useState<"visual" | "markdown">("visual")
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null)

  useEffect(() => {
    if (activeTab === "visual" && editorRef.current) {
      editorRef.current.innerHTML = convertMarkdownToHtml(value)
    }
  }, [value, activeTab])

  const convertMarkdownToHtml = (markdown: string): string => {
    return markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/!\[([^\]]*)\]$$([^$$]*)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[([^\]]*)\]$$([^$$]*)\)/gim, '<a href="$2">$1</a>')
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/`([^`]*)`/gim, "<code>$1</code>")
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
      .replace(/\n/gim, "<br>")
  }

  const convertHtmlToMarkdown = (html: string): string => {
    return html
      .replace(/<h1>(.*?)<\/h1>/gim, "# $1\n")
      .replace(/<h2>(.*?)<\/h2>/gim, "## $1\n")
      .replace(/<h3>(.*?)<\/h3>/gim, "### $1\n")
      .replace(/<strong>(.*?)<\/strong>/gim, "**$1**")
      .replace(/<em>(.*?)<\/em>/gim, "*$1*")
      .replace(/<img alt="([^"]*)" src="([^"]*)" \/>/gim, "![$1]($2)")
      .replace(/<a href="([^"]*)">(.*?)<\/a>/gim, "[$2]($1)")
      .replace(/<blockquote>(.*?)<\/blockquote>/gim, "> $1")
      .replace(/<code>(.*?)<\/code>/gim, "`$1`")
      .replace(/<li>(.*?)<\/li>/gim, "* $1")
      .replace(/<br>/gim, "\n")
      .replace(/<[^>]*>/gim, "")
  }

  const insertMarkdown = (before: string, after = "", placeholder = "") => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end)
      const replacement = selectedText || placeholder
      const newValue = value.substring(0, start) + before + replacement + after + value.substring(end)

      onChange(newValue)

      // Set cursor position
      setTimeout(() => {
        textarea.focus()
        const newCursorPos = start + before.length + replacement.length
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    }
  }

  const handleVisualEdit = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.innerHTML
      const markdownContent = convertHtmlToMarkdown(htmlContent)
      onChange(markdownContent)
    }
  }

  const toolbarButtons = [
    {
      icon: <Heading1 className="h-4 w-4" />,
      label: "Heading 1",
      action: () => insertMarkdown("# ", "", "Heading 1"),
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      label: "Heading 2",
      action: () => insertMarkdown("## ", "", "Heading 2"),
    },
    {
      icon: <Heading3 className="h-4 w-4" />,
      label: "Heading 3",
      action: () => insertMarkdown("### ", "", "Heading 3"),
    },
    {
      icon: <Bold className="h-4 w-4" />,
      label: "Bold",
      action: () => insertMarkdown("**", "**", "bold text"),
    },
    {
      icon: <Italic className="h-4 w-4" />,
      label: "Italic",
      action: () => insertMarkdown("*", "*", "italic text"),
    },
    {
      icon: <List className="h-4 w-4" />,
      label: "Bullet List",
      action: () => insertMarkdown("* ", "", "list item"),
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      label: "Numbered List",
      action: () => insertMarkdown("1. ", "", "list item"),
    },
    {
      icon: <Link className="h-4 w-4" />,
      label: "Link",
      action: () => insertMarkdown("[", "](url)", "link text"),
    },
    {
      icon: <ImageIcon className="h-4 w-4" />,
      label: "Image",
      action: () => insertMarkdown("![", "](image-url)", "alt text"),
    },
    {
      icon: <Quote className="h-4 w-4" />,
      label: "Quote",
      action: () => insertMarkdown("> ", "", "quote text"),
    },
    {
      icon: <Code className="h-4 w-4" />,
      label: "Code",
      action: () => insertMarkdown("`", "`", "code"),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Content Editor</span>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "visual" | "markdown")}>
            <TabsList>
              <TabsTrigger value="visual" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Visual
              </TabsTrigger>
              <TabsTrigger value="markdown" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Markdown
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeTab === "markdown" && (
          <>
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-gray-50">
              {toolbarButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={button.action}
                  title={button.label}
                  className="h-8 w-8 p-0"
                >
                  {button.icon}
                </Button>
              ))}
            </div>

            {/* Markdown Editor */}
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="min-h-[400px] font-mono text-sm border-t-0 rounded-t-none focus:ring-0"
              style={{ height }}
            />
          </>
        )}

        {activeTab === "visual" && (
          <div
            ref={editorRef}
            contentEditable
            onBlur={handleVisualEdit}
            className="min-h-[400px] p-4 border rounded-md prose prose-sm max-w-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ height }}
            dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(value) }}
          />
        )}

        {/* Preview */}
        <div className="mt-4">
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">Preview</summary>
            <div className="mt-2 p-4 border rounded-md bg-gray-50">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(value) }}
              />
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  )
}
