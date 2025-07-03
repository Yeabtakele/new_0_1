"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MessageCircle, Calendar, Globe, Users, Briefcase, Camera, Send, Linkedin } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatBot } from "@/components/chatbot"
import { useLanguage } from "@/hooks/use-language"
import { BookingSystem } from "@/components/booking-system"

export default function HomePage() {
  const { t, language } = useLanguage()
  const [showChat, setShowChat] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  const stats = [
    { icon: Briefcase, value: "10+", label: t("home.stats.experience") },
    { icon: Users, value: "500+", label: t("home.stats.clients") },
    { icon: Globe, value: "4", label: t("home.stats.languages") },
    { icon: Camera, value: "100+", label: t("home.stats.projects") },
  ]

  const services = [
    {
      title: t("home.services.sales.title"),
      description: t("home.services.sales.description"),
      icon: Briefcase,
      image: "/images/B2B Lead Generation.jpg",
      link: "/portfolio/sales",
    },
    {
      title: t("home.services.media.title"),
      description: t("home.services.media.description"),
      icon: Camera,
      image: "/images/Profile to .jpg",
      link: "/portfolio/media",
    },
    {
      title: t("home.services.community.title"),
      description: t("home.services.community.description"),
      icon: Users,
      image: "/images/Community Organizing & Development.jpg",
      link: "/community",
    },
    {
      title: t("home.services.tourism.title"),
      description: t("home.services.tourism.description"),
      icon: Globe,
      image: "/images/Grand Palace Historical Tours.webp",
      link: "/tourism",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm font-medium">
                  {t("home.hero.badge")}
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Trusted Partner for Tourism, Media, and Community Solutions
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  With over a decade of experience in tour consulting, media production, and social impact projects,
                  Eyob Salemot delivers reliable services for clients across Ethiopia and beyond.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowBooking(true)}>
                  Book a Tour Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="https://wa.me/251913300282"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="https://t.me/youcanwinnow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Telegram
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="https://linkedin.com/in/salesandmarketingmanagersethiopia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 p-8">
                <img
                  src="/images/eyob-international.jpg"
                  alt={t("home.hero.imageAlt")}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">{t("home.hero.availability")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <img
              src="/images/midia producation.jpg"
              alt="Media Production Services"
              className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
            />
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("home.services.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("home.services.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <a href={service.link}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t("home.cta.title")}</h2>
          <p className="text-xl text-blue-100 mb-8">{t("home.cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="mr-2 h-4 w-4" />
              {t("home.cta.book")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              {t("home.cta.contact")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
      {showBooking && <BookingSystem onClose={() => setShowBooking(false)} />}
    </div>
  )
}
