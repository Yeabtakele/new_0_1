import { NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status, message } = await request.json()

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const response = await strapi.updateBooking(Number.parseInt(params.id), {
      status,
      adminNotes: message,
    })

    // Here you could send status update email
    // await sendBookingStatusUpdate(booking.email, booking.id, status, message)

    return NextResponse.json({
      success: true,
      booking: {
        id: response.data.id,
        ...response.data.attributes,
      },
    })
  } catch (error) {
    console.error("Update booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
