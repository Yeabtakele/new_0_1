"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CalendarIcon } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    preferredTime: "",
    budget: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. I'll get back to you within 24 hours.",
    })
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      preferredTime: "",
      budget: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "eyobmind@gmail.com",
      description: "Send me an email anytime",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+251 911 123 456",
      description: "Call or WhatsApp",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Addis Ababa, Ethiopia",
      description: "Available for local meetings",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      description: "I respond to all inquiries quickly",
    },
  ]

  const services = [
    "Sales & Marketing Consulting",
    "Media Production",
    "Community Project Management",
    "Tourism Consulting",
    "Content Creation",
    "Public Speaking",
    "Other",
  ]

  const timeSlots = ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your next project? I'd love to hear from you. Let's discuss how we can work together to
              achieve your goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Send Me a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+251 911 123 456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                      <Textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell me about your project, goals, and how I can help you..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Meeting Time</label>
                        <Select
                          value={formData.preferredTime}
                          onValueChange={(value) => handleInputChange("preferredTime", value)}
                        >
                          <SelectTrigger>
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
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1000">Under $1,000</SelectItem>
                            <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10000-plus">$10,000+</SelectItem>
                            <SelectItem value="discuss">Let's discuss</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Calendar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <info.icon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{info.label}</p>
                        <p className="text-blue-600 font-medium">{info.value}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Schedule a Meeting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  <Button className="w-full mt-4">Book Selected Date</Button>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Monday - Friday</span>
                      <Badge variant="secondary">9 AM - 6 PM</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Saturday</span>
                      <Badge variant="secondary">10 AM - 2 PM</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Sunday</span>
                      <Badge variant="outline">By Appointment</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    All times are in East Africa Time (EAT). I'm also available for international calls outside these
                    hours by arrangement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How quickly do you respond?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    I typically respond to all inquiries within 24 hours. For urgent matters, feel free to call me
                    directly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you work with international clients?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! I work with clients globally and am comfortable with different time zones. I'm fluent in
                    English, Amharic, French, and conversational in Swahili.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's your consultation process?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    I start with a free 30-minute discovery call to understand your needs, then provide a detailed
                    proposal with timeline and pricing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer ongoing support?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    I provide ongoing support and maintenance for all projects, with flexible retainer options
                    available.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
