// Test script for booking email confirmation
// Run this with: node test-booking-email.js

const testBookingData = {
  firstName: "John",
  lastName: "Doe",
  email: "test@example.com", // Change this to your email for testing
  phone: "+251911123456",
  country: "Ethiopia",
  tourType: "addis-historical",
  groupSize: "2",
  selectedDate: "2025-02-15",
  timeSlot: "9:00 AM - 1:00 PM",
  specialRequests: "Vegetarian meal preference",
  language: "english"
}

async function testBookingEmail() {
  console.log("🧪 Testing Booking Email Confirmation System...")
  console.log("📧 Test booking data:", testBookingData)
  
  try {
    const response = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testBookingData),
    })

    const result = await response.json()

    if (response.ok) {
      console.log("✅ Booking test successful!")
      console.log("📋 Booking ID:", result.bookingId)
      console.log("📧 Email status:", result.message)
      console.log("📨 Check your email for confirmation")
    } else {
      console.log("❌ Booking test failed:")
      console.log("Error:", result.error)
    }
  } catch (error) {
    console.log("❌ Network error:", error.message)
    console.log("💡 Make sure your development server is running on localhost:3000")
  }
}

// Instructions for manual testing
console.log("🚀 Booking Email Test Instructions:")
console.log("1. Make sure your development server is running: npm run dev")
console.log("2. Update the email address in testBookingData above")
console.log("3. Run this script: node test-booking-email.js")
console.log("4. Check your email for confirmation")
console.log("5. Check your admin email for notification")
console.log("")

// Run the test
testBookingEmail() 