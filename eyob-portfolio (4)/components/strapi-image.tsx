"use client"

import Image from "next/image"
import { useState } from "react"

interface StrapiImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
  sizes?: string
}

export function StrapiImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  priority = false,
  sizes,
}: StrapiImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Handle Strapi image URLs
  const getImageUrl = (url: string) => {
    if (url.startsWith("http")) {
      return url
    }
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    return `${strapiUrl}${url}`
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <div className={`relative ${isLoading ? "animate-pulse bg-gray-200" : ""} ${className}`}>
      <Image
        src={getImageUrl(src) || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}
