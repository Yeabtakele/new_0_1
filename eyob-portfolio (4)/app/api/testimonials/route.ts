import { NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get("locale") || "en"

    const response = await strapi.getTestimonials(locale)

    const testimonials = response.data.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.attributes.name,
      position: testimonial.attributes.position,
      company: testimonial.attributes.company,
      content: testimonial.attributes.content,
      rating: testimonial.attributes.rating,
      avatar: testimonial.attributes.avatar?.data
        ? {
            url: testimonial.attributes.avatar.data.attributes.url,
            alt: testimonial.attributes.avatar.data.attributes.alternativeText || testimonial.attributes.name,
          }
        : null,
      locale: testimonial.attributes.locale,
      publishedAt: testimonial.attributes.publishedAt,
      createdAt: testimonial.attributes.createdAt,
    }))

    return NextResponse.json({
      success: true,
      testimonials,
      meta: response.meta,
    })
  } catch (error) {
    console.error("Testimonials API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch testimonials",
        testimonials: [],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const testimonialData = await request.json()

    const strapiTestimonialData = {
      name: testimonialData.name,
      position: testimonialData.position,
      company: testimonialData.company,
      content: testimonialData.content,
      rating: testimonialData.rating,
      published: false, // Admin needs to approve
    }

    const response = await strapi.createTestimonial(strapiTestimonialData)

    return NextResponse.json({
      success: true,
      testimonial: {
        id: response.data.id,
        ...response.data.attributes,
      },
      message: "Testimonial submitted successfully",
    })
  } catch (error) {
    console.error("Create testimonial error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create testimonial",
      },
      { status: 500 },
    )
  }
}
