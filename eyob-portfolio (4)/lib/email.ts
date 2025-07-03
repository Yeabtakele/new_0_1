import nodemailer from "nodemailer"

interface BookingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country?: string
  tourType: string
  groupSize: string
  selectedDate: string
  timeSlot: string
  specialRequests?: string
  language?: string
}

interface ContactData {
  name: string
  email: string
  phone?: string
  service: string
  message: string
}

interface TourPackage {
  id: string
  name: string
  duration: string
  price: string
  description: string
}

interface EmailResult {
  success: boolean
  bookingId?: string
  error?: string
}

const tourPackages: Record<string, TourPackage> = {
  "addis-historical": {
    id: "addis-historical",
    name: "Addis Ababa Historical Tour",
    duration: "Full Day (8 hours)",
    price: "1,500 ETB",
    description: "Comprehensive historical tour covering Ethiopia's imperial heritage",
  },
  "cultural-immersion": {
    id: "cultural-immersion",
    name: "Cultural Immersion Experience",
    duration: "2 Days",
    price: "2,800 ETB",
    description: "Deep dive into Ethiopian culture and traditions",
  },
  "nature-highlights": {
    id: "nature-highlights",
    name: "Addis Highlights & Nature",
    duration: "Full Day (6 hours)",
    price: "1,800 ETB",
    description: "Perfect blend of natural beauty and historical significance",
  },
  "photography-tour": {
    id: "photography-tour",
    name: "Photography Tour",
    duration: "Full Day (8 hours)",
    price: "2,200 ETB",
    description: "Capture the essence of Addis Ababa with expert guidance",
  },
  "custom-tour": {
    id: "custom-tour",
    name: "Custom Tour Package",
    duration: "Flexible",
    price: "Contact for quote",
    description: "Tailored tour based on your specific interests and requirements",
  },
}

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Generate booking confirmation email HTML
const generateBookingConfirmationEmail = (bookingData: BookingData, bookingId: string): string => {
  const selectedTour = tourPackages[bookingData.tourType]
  const bookingDate = new Date(bookingData.selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tour Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .detail-label { font-weight: bold; color: #475569; }
        .detail-value { color: #1e293b; }
        .next-steps { background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .contact-info { background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; }
        .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        .btn:hover { background: #1d4ed8; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .booking-id { background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; font-weight: bold; display: inline-block; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🇪🇹 Eyob Salemot Tours</div>
        <h1>Booking Confirmation</h1>
        <p>Thank you for choosing our Ethiopian heritage tours!</p>
        <div class="booking-id">Booking ID: ${bookingId}</div>
      </div>
      
      <div class="content">
        <h2>Dear ${bookingData.firstName} ${bookingData.lastName},</h2>
        
        <p>Thank you for your tour booking request! We're excited to share Ethiopia's rich heritage with you. Your booking has been received and is currently being processed.</p>
        
        <div class="booking-details">
          <h3>📋 Booking Details</h3>
          <div class="detail-row">
            <span class="detail-label">Tour Package:</span>
            <span class="detail-value">${selectedTour?.name || "Custom Tour"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Duration:</span>
            <span class="detail-value">${selectedTour?.duration || "Flexible"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Price:</span>
            <span class="detail-value">${selectedTour?.price || "Contact for quote"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">${bookingData.selectedDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Time:</span>
            <span class="detail-value">${bookingData.timeSlot}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Group Size:</span>
            <span class="detail-value">${bookingData.groupSize} people</span>
          </div>
          ${
            bookingData.language
              ? `
          <div class="detail-row">
            <span class="detail-label">Preferred Language:</span>
            <span class="detail-value">${bookingData.language}</span>
          </div>
          `
              : ""
          }
          ${
            bookingData.specialRequests
              ? `
          <div class="detail-row">
            <span class="detail-label">Special Requests:</span>
            <span class="detail-value">${bookingData.specialRequests}</span>
          </div>
          `
              : ""
          }
        </div>
        
        <div class="next-steps">
          <h3>📞 Next Steps</h3>
          <ul>
            <li><strong>Confirmation Call:</strong> I'll contact you within 24 hours to confirm availability and discuss details</li>
            <li><strong>Payment Options:</strong> We'll discuss payment methods (bank transfer, mobile money, or cash)</li>
            <li><strong>Detailed Itinerary:</strong> You'll receive a comprehensive tour itinerary before your visit</li>
            <li><strong>Pickup Arrangements:</strong> We'll arrange convenient pickup from your hotel or preferred location</li>
          </ul>
        </div>
        
        <div class="contact-info">
          <h3>📱 Contact Information</h3>
          <p><strong>Eyob Salemot</strong> - Professional Tour Guide & Cultural Expert</p>
          <p>📞 <strong>Phone/WhatsApp:</strong> +251 911 123 456</p>
          <p>📧 <strong>Email:</strong> eyob@example.com</p>
          <p>🕒 <strong>Response Time:</strong> Within 24 hours</p>
          <p>📍 <strong>Location:</strong> Addis Ababa, Ethiopia</p>
          
          <div style="margin-top: 15px;">
            <a href="https://wa.me/251911123456" class="btn">💬 WhatsApp</a>
            <a href="tel:+251911123456" class="btn">📞 Call Now</a>
          </div>
        </div>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>🏛️ About Your Tour</h3>
          <p>${selectedTour?.description || "Custom tour tailored to your interests"}</p>
          <p><strong>What's Included:</strong></p>
          <ul>
            <li>Professional multilingual guide (English, Amharic, French, Swahili)</li>
            <li>Transportation in comfortable vehicle</li>
            <li>All entrance fees to historical sites</li>
            <li>Cultural experiences and local interactions</li>
            <li>Photography assistance and best viewpoints</li>
            <li>Refreshments and local lunch (full day tours)</li>
          </ul>
        </div>
        
        <div style="background: #fef7cd; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p><strong>💡 Preparation Tips:</strong></p>
          <ul>
            <li>Comfortable walking shoes recommended</li>
            <li>Bring camera for memorable photos</li>
            <li>Light jacket for mountain visits</li>
            <li>Respect local customs at religious sites</li>
          </ul>
        </div>
      </div>
      
      <div class="footer">
        <p>This is an automated confirmation. Please save this email for your records.</p>
        <p>© 2024 Eyob Salemot Tours. Discover Ethiopia's Heritage with Expert Guidance.</p>
        <p>🌐 <a href="https://eyobsalemot.com">eyobsalemot.com</a> | 📧 eyob@example.com</p>
      </div>
    </body>
    </html>
  `
}

// Generate admin notification email
const generateAdminNotificationEmail = (bookingData: BookingData, bookingId: string): string => {
  const selectedTour = tourPackages[bookingData.tourType]
  const bookingDate = new Date(bookingData.selectedDate).toLocaleDateString()

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .urgent { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .detail-row { margin: 8px 0; }
        .label { font-weight: bold; color: #374151; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚨 New Booking Request</h1>
        <p>Booking ID: ${bookingId}</p>
      </div>
      
      <div class="content">
        <div class="urgent">
          <h3>⏰ Action Required</h3>
          <p><strong>Contact customer within 24 hours to confirm booking!</strong></p>
        </div>
        
        <div class="booking-details">
          <h3>Customer Information</h3>
          <div class="detail-row"><span class="label">Name:</span> ${bookingData.firstName} ${bookingData.lastName}</div>
          <div class="detail-row"><span class="label">Email:</span> ${bookingData.email}</div>
          <div class="detail-row"><span class="label">Phone:</span> ${bookingData.phone}</div>
          <div class="detail-row"><span class="label">Country:</span> ${bookingData.country || "Not specified"}</div>
          <div class="detail-row"><span class="label">Language:</span> ${bookingData.language || "Not specified"}</div>
        </div>
        
        <div class="booking-details">
          <h3>Tour Details</h3>
          <div class="detail-row"><span class="label">Tour:</span> ${selectedTour?.name || "Custom Tour"}</div>
          <div class="detail-row"><span class="label">Date:</span> ${bookingDate}</div>
          <div class="detail-row"><span class="label">Time:</span> ${bookingData.timeSlot}</div>
          <div class="detail-row"><span class="label">Group Size:</span> ${bookingData.groupSize} people</div>
          <div class="detail-row"><span class="label">Price:</span> ${selectedTour?.price || "Contact for quote"}</div>
          ${bookingData.specialRequests ? `<div class="detail-row"><span class="label">Special Requests:</span> ${bookingData.specialRequests}</div>` : ""}
        </div>
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <h3>Quick Actions</h3>
          <p>📞 <a href="tel:${bookingData.phone}">Call ${bookingData.phone}</a></p>
          <p>📧 <a href="mailto:${bookingData.email}">Email ${bookingData.email}</a></p>
          <p>💬 <a href="https://wa.me/${bookingData.phone.replace(/[^0-9]/g, "")}">WhatsApp</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Generate contact confirmation email
const generateContactConfirmationEmail = (contactData: any): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .message-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
        .contact-info { background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; }
        .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🇪🇹 Eyob Salemot</div>
        <h1>Message Received</h1>
        <p>Thank you for reaching out!</p>
      </div>
      
      <div class="content">
        <h2>Dear ${contactData.name},</h2>
        
        <p>Thank you for your message! I've received your inquiry about <strong>${contactData.service}</strong> and will respond within 24 hours.</p>
        
        <div class="message-details">
          <h3>📋 Your Message Details</h3>
          <p><strong>Service Interest:</strong> ${contactData.service}</p>
          <p><strong>Your Message:</strong></p>
          <p style="background: #f8fafc; padding: 15px; border-radius: 6px; font-style: italic;">"${contactData.message}"</p>
        </div>
        
        <div class="contact-info">
          <h3>📱 Contact Information</h3>
          <p><strong>Eyob Salemot</strong> - Professional Tour Guide & Cultural Expert</p>
          <p>📞 <strong>Phone/WhatsApp:</strong> +251 911 123 456</p>
          <p>📧 <strong>Email:</strong> eyob@example.com</p>
          <p>🕒 <strong>Response Time:</strong> Within 24 hours</p>
          <p>📍 <strong>Location:</strong> Addis Ababa, Ethiopia</p>
          
          <div style="margin-top: 15px;">
            <a href="https://wa.me/251911123456" class="btn">💬 WhatsApp</a>
            <a href="tel:+251911123456" class="btn">📞 Call Now</a>
          </div>
        </div>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>🏛️ What to Expect</h3>
          <ul>
            <li><strong>Personal Response:</strong> I'll personally review and respond to your inquiry</li>
            <li><strong>Detailed Information:</strong> You'll receive comprehensive details about your service of interest</li>
            <li><strong>Custom Solutions:</strong> I'll tailor my response to your specific needs and requirements</li>
            <li><strong>Follow-up Support:</strong> Ongoing assistance throughout your planning process</li>
          </ul>
        </div>
      </div>
      
      <div class="footer">
        <p>This is an automated confirmation. I'll respond personally within 24 hours.</p>
        <p>© 2024 Eyob Salemot. Professional Services in Tourism, Media & Community Development.</p>
        <p>🌐 <a href="https://eyobsalemot.com">eyobsalemot.com</a> | 📧 eyob@example.com</p>
      </div>
    </body>
    </html>
  `
}

// Send booking confirmation emails
export const sendBookingConfirmation = async (bookingData: any): Promise<EmailResult> => {
  try {
    // Generate booking ID
    const bookingId = `BK${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    // In a real application, you would use a service like:
    // - Resend
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP

    // For now, we'll simulate email sending
    console.log("📧 Sending booking confirmation email...")
    console.log("To:", bookingData.email)
    console.log("Booking ID:", bookingId)
    console.log("Tour:", bookingData.tourType)
    console.log("Date:", bookingData.selectedDate)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate success (in real app, this would be actual email sending)
    return {
      success: true,
      bookingId,
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      error: "Failed to send confirmation email",
    }
  }
}

// Send booking status update
export const sendBookingStatusUpdate = async (
  email: string,
  bookingId: string,
  status: string,
  message?: string,
): Promise<EmailResult> => {
  try {
    console.log("📧 Sending booking status update email...")
    console.log("To:", email)
    console.log("Booking ID:", bookingId)
    console.log("Status:", status)
    console.log("Message:", message)

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
    }
  } catch (error) {
    console.error("Status update email error:", error)
    return {
      success: false,
      error: "Failed to send status update email",
    }
  }
}

// Send contact confirmation email
export const sendContactConfirmation = async (contactData: any): Promise<EmailResult> => {
  try {
    console.log("📧 Sending contact confirmation email...")
    console.log("To:", contactData.email)
    console.log("Service:", contactData.service)

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
    }
  } catch (error) {
    console.error("Contact email error:", error)
    return {
      success: false,
      error: "Failed to send contact confirmation",
    }
  }
}
