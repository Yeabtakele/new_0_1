"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export default function BlogPage() {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: "Blog",
      comingSoon: "Coming Soon",
      description: "We're working hard to bring you insightful articles about tourism, media production, and marketing. Stay tuned for valuable content coming your way!",
      subscribe: "Subscribe to get notified",
      backHome: "Back to Home",
      features: [
        "Tourism insights and travel guides",
        "Media production tips and behind-the-scenes",
        "Marketing strategies and industry trends",
        "Professional development and career advice"
      ]
    },
    am: {
      title: "ብሎግ",
      comingSoon: "በቅርቡ ይመጣል",
      description: "የቱሪዝም፣ የሚዲያ ምርት እና የግብይት ጥልቀት ያለው ጽሑፍ እንድንያመጥልዎ እያሰራን ነን። የሚመጣውን ጠቃሚ ይዘት ለማየት ያስተግብሩ!",
      subscribe: "ለማሳወቂያ ይመዝገቡ",
      backHome: "ወደ መነሻ ይመለሱ",
      features: [
        "የቱሪዝም ግንዛቤ እና የጉዞ መመሪያዎች",
        "የሚዲያ ምርት ምክሮች እና የድህረ ቅጽ ታሪኮች",
        "የግብይት ስልቶች እና የዘርፍ አዝማሚያዎች",
        "የሙያ ማሳደጊያ እና የስራ ምክር"
      ]
    }
  }

  const t = translations[language as keyof typeof translations] || translations.en

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.title}
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          {/* Coming Soon Card */}
          <Card className="mb-12">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                {t.comingSoon}
              </CardTitle>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.description}
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" className="mb-6">
                <Calendar className="h-5 w-5 mr-2" />
                {t.subscribe}
              </Button>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {t.features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-blue-600 font-semibold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                {t.backHome}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 