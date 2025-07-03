import { NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"
import { sendBookingConfirmation } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const bookingData = await request.json()

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "tourType",
      "groupSize",
      "selectedDate",
      "timeSlot",
    ]

    const missingFields = requiredFields.filter((field) => !bookingData[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    // Create booking in Strapi
    const strapiBookingData = {
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      country: bookingData.country,
      tourType: bookingData.tourType,
      groupSize: Number.parseInt(bookingData.groupSize),
      selectedDate: bookingData.selectedDate,
      timeSlot: bookingData.timeSlot,
      specialRequests: bookingData.specialRequests,
      language: bookingData.language,
      status: "pending",
    }

    const response = await strapi.createBooking(strapiBookingData)

    // Send confirmation emails
    const emailResult = await sendBookingConfirmation(bookingData)

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        bookingId: response.data.id,
        message: "Booking request submitted successfully. Confirmation emails sent.",
      })
    } else {
      return NextResponse.json({
        success: true,
        bookingId: response.data.id,
        message: "Booking saved but email sending failed",
        emailError: emailResult.error,
      })
    }
  } catch (error) {
    console.error("Booking API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
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

    const response = await strapi.getBookings({
      filters,
      sort: ["createdAt:desc"],
      pagination: { page, pageSize },
    })

    const bookings = response.data.map((booking) => ({
      id: booking.id,
      firstName: booking.attributes.firstName,
      lastName: booking.attributes.lastName,
      email: booking.attributes.email,
      phone: booking.attributes.phone,
      country: booking.attributes.country,
      tourType: booking.attributes.tourType,
      groupSize: booking.attributes.groupSize,
      selectedDate: booking.attributes.selectedDate,
      timeSlot: booking.attributes.timeSlot,
      specialRequests: booking.attributes.specialRequests,
      language: booking.attributes.language,
      status: booking.attributes.status,
      createdAt: booking.attributes.createdAt,
      updatedAt: booking.attributes.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      bookings,
      meta: response.meta,
    })
  } catch (error) {
    console.error("Get bookings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
