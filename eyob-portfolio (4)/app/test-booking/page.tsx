"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TestBookingPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)

  const [testData, setTestData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "test@example.com",
    phone: "+251911123456",
    country: "Ethiopia",
    tourType: "addis-historical",
    groupSize: "2",
    selectedDate: "2025-02-15",
    timeSlot: "9:00 AM - 1:00 PM",
    specialRequests: "Test booking for email confirmation",
    language: "english"
  })

  const handleInputChange = (field: string, value: string) => {
    setTestData(prev => ({ ...prev, [field]: value }))
  }

  const testBookingEmail = async () => {
    setIsSubmitting(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const result = await response.json()
      setTestResult(result)

      if (response.ok) {
        toast({
          title: "✅ Test Successful!",
          description: `Booking ID: ${result.bookingId}. Check your email for confirmation.`,
        })
      } else {
        toast({
          title: "❌ Test Failed",
          description: result.error || "Failed to send booking confirmation",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Network Error",
        description: "Failed to connect to the booking API",
        variant: "destructive",
      })
      setTestResult({ error: "Network error" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🧪 Booking Email Test</h1>
            <p className="text-gray-600">Test the booking confirmation email system</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Test Booking Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <Input
                      value={testData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <Input
                      value={testData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input
                    type="email"
                    value={testData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your-email@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">This is where the confirmation email will be sent</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input
                    value={testData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tour Type</label>
                  <Select
                    value={testData.tourType}
                    onValueChange={(value) => handleInputChange("tourType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="addis-historical">Addis Ababa Historical Tour</SelectItem>
                      <SelectItem value="cultural-immersion">Cultural Immersion Experience</SelectItem>
                      <SelectItem value="nature-highlights">Addis Highlights & Nature</SelectItem>
                      <SelectItem value="photography-tour">Photography Tour</SelectItem>
                      <SelectItem value="custom-tour">Custom Tour Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={testBookingEmail} 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "🧪 Test Booking Email"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResult ? (
                  <div className="space-y-4">
                    {testResult.success ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-semibold">Test Successful!</span>
                        </div>
                        <div className="mt-2 text-sm text-green-700">
                          <p><strong>Booking ID:</strong> {testResult.bookingId}</p>
                          <p><strong>Message:</strong> {testResult.message}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-red-800">
                          <AlertCircle className="h-5 w-5" />
                          <span className="font-semibold">Test Failed</span>
                        </div>
                        <div className="mt-2 text-sm text-red-700">
                          <p><strong>Error:</strong> {testResult.error}</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">📧 What to Check:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Check your email inbox for confirmation</li>
                        <li>• Check spam/junk folder</li>
                        <li>• Verify admin email received notification</li>
                        <li>• Check console logs for email details</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Click "Test Booking Email" to start the test</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 