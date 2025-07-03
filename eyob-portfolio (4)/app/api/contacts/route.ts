import { NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"

export async function POST(request: Request) {
  try {
    const contactData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "service", "message"]
    const missingFields = requiredFields.filter((field) => !contactData[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Create contact in Strapi
    const strapiContactData = {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      service: contactData.service,
      message: contactData.message,
      status: "new",
    }

    const response = await strapi.createContact(strapiContactData)

    return NextResponse.json({
      success: true,
      contact: {
        id: response.data.id,
        ...response.data.attributes,
      },
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "20")

    const filters: Record<string, any> = {}

    if (status && status !== "all") {
      filters.status = { $eq: status }
    }

    const response = await strapi.getContacts({
      filters,
      sort: ["createdAt:desc"],
      pagination: { page, pageSize },
    })

    const contacts = response.data.map((contact) => ({
      id: contact.id,
      name: contact.attributes.name,
      email: contact.attributes.email,
      phone: contact.attributes.phone,
      service: contact.attributes.service,
      message: contact.attributes.message,
      status: contact.attributes.status,
      createdAt: contact.attributes.createdAt,
    }))

    return NextResponse.json({
      success: true,
      contacts,
      meta: response.meta,
    })
  } catch (error) {
    console.error("Get contacts error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch contacts",
      },
      { status: 500 },
    )
  }
}
