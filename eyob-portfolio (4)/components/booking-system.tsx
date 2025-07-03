"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, CalendarIcon, Clock, Users, MapPin, Phone, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookingSystemProps {
  onClose: () => void
}

export function BookingSystem({ onClose }: BookingSystemProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingData, setBookingData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",

    // Tour Details
    tourType: "",
    groupSize: "",
    preferredDate: "",
    timeSlot: "",
    duration: "",

    // Special Requirements
    specialRequests: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",

    // Contact Preferences
    contactMethod: "",
    language: "",
  })

  const tourPackages = [
    {
      id: "addis-historical",
      name: "Addis Ababa Historical Tour",
      duration: "Full Day (8 hours)",
      price: "1,500 ETB",
      maxGroup: 8,
      includes: ["Grand Palace", "Adwa Museum", "National Museum", "Holy Trinity Cathedral"],
      description: "Comprehensive historical tour covering Ethiopia's imperial heritage",
    },
    {
      id: "cultural-immersion",
      name: "Cultural Immersion Experience",
      duration: "2 Days",
      price: "2,800 ETB",
      maxGroup: 6,
      includes: ["Merkato Market", "Coffee ceremony", "Local restaurants", "Cultural performances"],
      description: "Deep dive into Ethiopian culture and traditions",
    },
    {
      id: "nature-highlights",
      name: "Addis Highlights & Nature",
      duration: "Full Day (6 hours)",
      price: "1,800 ETB",
      maxGroup: 10,
      includes: ["Entoto Mountain", "City views", "Historical sites", "Local lunch"],
      description: "Perfect blend of natural beauty and historical significance",
    },
    {
      id: "photography-tour",
      name: "Photography Tour",
      duration: "Full Day (8 hours)",
      price: "2,200 ETB",
      maxGroup: 6,
      includes: ["Best photo spots", "Professional guidance", "Cultural interactions", "Sunset viewing"],
      description: "Capture the essence of Addis Ababa with expert guidance",
    },
    {
      id: "custom-tour",
      name: "Custom Tour Package",
      duration: "Flexible",
      price: "Contact for quote",
      maxGroup: "Flexible",
      includes: ["Personalized itinerary", "Flexible scheduling", "Custom experiences"],
      description: "Tailored tour based on your specific interests and requirements",
    },
  ]

  const timeSlots = [
    "8:00 AM - 12:00 PM",
    "9:00 AM - 1:00 PM",
    "10:00 AM - 2:00 PM",
    "1:00 PM - 5:00 PM",
    "2:00 PM - 6:00 PM",
    "Full Day (8:00 AM - 6:00 PM)",
  ]

  const languages = ["English", "Amharic", "French", "Swahili"]

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Allow various phone formats including international
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    const cleanPhone = phone.replace(/[\s\-()]/g, "")
    return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone)
  }

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    if (step === 1) {
      if (!bookingData.firstName.trim()) {
        errors.firstName = "First name is required"
      }
      if (!bookingData.lastName.trim()) {
        errors.lastName = "Last name is required"
      }
      if (!bookingData.email.trim()) {
        errors.email = "Email is required"
      } else if (!validateEmail(bookingData.email)) {
        errors.email = "Please enter a valid email address"
      }
      if (!bookingData.phone.trim()) {
        errors.phone = "Phone number is required"
      } else if (!validatePhone(bookingData.phone)) {
        errors.phone = "Please enter a valid phone number (min 10 digits)"
      }
    }

    if (step === 2) {
      if (!bookingData.tourType) {
        errors.tourType = "Please select a tour package"
      }
    }

    if (step === 3) {
      if (!selectedDate) {
        errors.selectedDate = "Please select a date"
      }
      if (!bookingData.timeSlot) {
        errors.timeSlot = "Please select a time slot"
      }
      if (!bookingData.groupSize) {
        errors.groupSize = "Please select group size"
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      toast({
        title: "❌ Validation Error",
        description: "Please fill in all required fields correctly before proceeding.",
        variant: "destructive",
      })
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setValidationErrors({}) // Clear errors when going back
    }
  }

  const handleSubmitBooking = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)

    try {
      const bookingPayload = {
        ...bookingData,
        selectedDate: selectedDate?.toISOString(),
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "🎉 Booking Request Submitted!",
          description: `Thank you! Your booking ID is ${result.bookingId}. Confirmation emails have been sent.`,
        })
        onClose()
      } else {
        toast({
          title: "❌ Booking Failed",
          description: result.error || "Failed to submit booking. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Network Error",
        description: "Failed to submit booking. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedTour = tourPackages.find((tour) => tour.id === bookingData.tourType)

  const getInputClassName = (fieldName: string) => {
    return validationErrors[fieldName] ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div>
            <CardTitle className="text-2xl">Book Your Tour Consultation</CardTitle>
            <p className="text-gray-600 mt-1">Step {currentStep} of 4</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <Input
                      required
                      value={bookingData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Your first name"
                      className={getInputClassName("firstName")}
                    />
                    {validationErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <Input
                      required
                      value={bookingData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Your last name"
                      className={getInputClassName("lastName")}
                    />
                    {validationErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className={getInputClassName("email")}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      required
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+251 911 123 456"
                      className={getInputClassName("phone")}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.phone}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +251 for Ethiopia)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <Input
                      value={bookingData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      placeholder="Your country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                    <Select
                      value={bookingData.language}
                      onValueChange={(value) => handleInputChange("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang.toLowerCase()}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Tour Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Select Your Tour Package
                </h3>
                {validationErrors.tourType && (
                  <p className="text-red-500 text-sm mb-4 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.tourType}
                  </p>
                )}
                <div className="grid gap-4">
                  {tourPackages.map((tour) => (
                    <div
                      key={tour.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        bookingData.tourType === tour.id
                          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => handleInputChange("tourType", tour.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{tour.name}</h4>
                        <Badge variant="outline" className={bookingData.tourType === tour.id ? "bg-blue-100" : ""}>
                          {tour.price}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{tour.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {tour.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Max {tour.maxGroup} people
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Includes:</p>
                        <div className="flex flex-wrap gap-1">
                          {tour.includes.map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Select Date & Time
                </h3>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                    {validationErrors.selectedDate && (
                      <p className="text-red-500 text-sm mb-2 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.selectedDate}
                      </p>
                    )}
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        if (validationErrors.selectedDate) {
                          setValidationErrors((prev) => {
                            const newErrors = { ...prev }
                            delete newErrors.selectedDate
                            return newErrors
                          })
                        }
                      }}
                      className="rounded-md border"
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot *</label>
                      <Select
                        value={bookingData.timeSlot}
                        onValueChange={(value) => handleInputChange("timeSlot", value)}
                      >
                        <SelectTrigger className={getInputClassName("timeSlot")}>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {validationErrors.timeSlot && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {validationErrors.timeSlot}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Group Size *</label>
                      <Select
                        value={bookingData.groupSize}
                        onValueChange={(value) => handleInputChange("groupSize", value)}
                      >
                        <SelectTrigger className={getInputClassName("groupSize")}>
                          <SelectValue placeholder="Number of people" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "person" : "people"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {validationErrors.groupSize && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {validationErrors.groupSize}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                      <Textarea
                        value={bookingData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        placeholder="Any special requests, dietary restrictions, or accessibility needs..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Review Your Booking
                </h3>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong> {bookingData.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {bookingData.phone}
                        </p>
                        {bookingData.country && (
                          <p>
                            <strong>Country:</strong> {bookingData.country}
                          </p>
                        )}
                        {bookingData.language && (
                          <p>
                            <strong>Language:</strong> {bookingData.language}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Tour Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <strong>Tour:</strong> {selectedTour?.name}
                        </p>
                        <p>
                          <strong>Duration:</strong> {selectedTour?.duration}
                        </p>
                        <p>
                          <strong>Price:</strong> {selectedTour?.price}
                        </p>
                        <p>
                          <strong>Group Size:</strong> {bookingData.groupSize} people
                        </p>
                        <p>
                          <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Time:</strong> {bookingData.timeSlot}
                        </p>
                      </div>
                    </div>
                  </div>

                  {bookingData.specialRequests && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Special Requests</h4>
                      <p className="text-sm text-gray-600">{bookingData.specialRequests}</p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• I'll contact you within 24 hours to confirm availability</li>
                    <li>• We'll discuss final details and payment options</li>
                    <li>• You'll receive a detailed itinerary before your tour</li>
                    <li>• Payment can be made via bank transfer or mobile money</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Information
                  </h4>
                  <div className="text-sm text-green-800 space-y-1">
                    <p>
                      <strong>Phone/WhatsApp:</strong> +251 911 123 456
                    </p>
                    <p>
                      <strong>Email:</strong> eyobmind@gmail.com
                    </p>
                    <p>
                      <strong>Response Time:</strong> Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNextStep}>Next</Button>
            ) : (
              <Button onClick={handleSubmitBooking} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
