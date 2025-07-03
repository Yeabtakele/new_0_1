"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Star, Camera, Clock, Plane } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"

export default function TourismPage() {
  const { t } = useLanguage()

  const tourismMetrics = [
    { icon: Users, label: "Tours Organized", value: "500+", color: "text-green-600" },
    { icon: Star, label: "Client Satisfaction", value: "98%", color: "text-yellow-600" },
    { icon: MapPin, label: "Destinations Covered", value: "25+", color: "text-blue-600" },
    { icon: Calendar, label: "Years Experience", value: "8+", color: "text-purple-600" },
  ]

  const addisAbabaAttractions = [
    {
      name: "Grand Palace (Menelik Palace)",
      description: "Historic imperial palace showcasing Ethiopia's royal heritage and architectural grandeur",
      image: "/images/grand plase of menlik.jpg",
      category: "Historical Palace",
      duration: "2-3 hours",
      highlights: [
        "Imperial throne room and royal chambers",
        "Traditional Ethiopian architecture",
        "Historical artifacts and royal collections",
        "Beautiful palace gardens and courtyards",
      ],
      bestTime: "Morning (9 AM - 12 PM)",
      difficulty: "Easy",
      price: "200-300 ETB",
    },
    {
      name: "Adwa Victory Museum",
      description: "Commemorating Ethiopia's historic victory at the Battle of Adwa in 1896, preserving national pride",
      image: "/images/Adwa Victory Museum.jpg",
      category: "Historical Museum",
      duration: "1-2 hours",
      highlights: [
        "Battle of Adwa historical exhibits",
        "Emperor Menelik II artifacts",
        "Traditional weapons and military displays",
        "Interactive historical presentations",
      ],
      bestTime: "Any time (9 AM - 5 PM)",
      difficulty: "Easy",
      price: "50-100 ETB",
    },
    {
      name: "National Museum of Ethiopia",
      description: "Home to Lucy (Dinknesh) and extensive collections of Ethiopian cultural and natural history",
      image: "/images/National Museum of Ethiopia.jpg",
      category: "Cultural Museum",
      duration: "2-3 hours",
      highlights: [
        "Lucy (Australopithecus afarensis) fossil",
        "Ancient Ethiopian civilizations",
        "Traditional art and cultural artifacts",
        "Paleontological discoveries",
      ],
      bestTime: "Morning or afternoon",
      difficulty: "Easy",
      price: "10-20 ETB",
    },
    {
      name: "Holy Trinity Cathedral",
      description: "Beautiful Orthodox cathedral with stunning architecture and historical significance",
      image: "/images/Holy Trinity Cathedral.jpg",
      category: "Religious Site",
      duration: "1-2 hours",
      highlights: [
        "Emperor Haile Selassie's tomb",
        "Beautiful stained glass windows",
        "Traditional Ethiopian Orthodox architecture",
        "Peaceful gardens and courtyards",
      ],
      bestTime: "Morning (avoid service times)",
      difficulty: "Easy",
      price: "Free (donations welcome)",
    },
    {
      name: "Merkato Market",
      description: "Africa's largest open-air market offering authentic Ethiopian shopping and cultural experience",
      image: "/images/Merkato Market .jpg",
      category: "Cultural Market",
      duration: "2-4 hours",
      highlights: [
        "Traditional Ethiopian crafts and textiles",
        "Spices and coffee trading",
        "Local food and cultural immersion",
        "Authentic shopping experience",
      ],
      bestTime: "Morning (8 AM - 12 PM)",
      difficulty: "Moderate",
      price: "Free entry (shopping budget varies)",
    },
    {
      name: "Entoto Mountain",
      description: "Panoramic views of Addis Ababa with historical churches and eucalyptus forests",
      image: "/images/Entoto Mountain.jpg",
      category: "Natural Attraction",
      duration: "Half day",
      highlights: [
        "Panoramic city views",
        "Entoto Maryam Church",
        "Emperor Menelik's palace ruins",
        "Eucalyptus forest hiking trails",
      ],
      bestTime: "Early morning or late afternoon",
      difficulty: "Moderate",
      price: "Transportation + guide fees",
    },
  ]

  const tourPackages = [
    {
      title: "Addis Ababa Historical Tour",
      duration: "Full Day",
      price: "1,500 ETB per person",
      groupSize: "2-8 people",
      includes: ["Grand Palace", "Adwa Museum", "National Museum", "Holy Trinity Cathedral"],
      description: "Comprehensive historical tour covering Ethiopia's imperial heritage and cultural treasures",
    },
    {
      title: "Cultural Immersion Experience",
      duration: "2 Days",
      price: "2,800 ETB per person",
      groupSize: "2-6 people",
      includes: ["Merkato Market", "Traditional coffee ceremony", "Local restaurant visits", "Cultural performances"],
      description: "Deep dive into Ethiopian culture, traditions, and authentic local experiences",
    },
    {
      title: "Addis Highlights & Nature",
      duration: "Full Day",
      price: "1,800 ETB per person",
      groupSize: "2-10 people",
      includes: ["Entoto Mountain", "City panoramic views", "Historical sites", "Local lunch"],
      description: "Perfect blend of natural beauty and historical significance with stunning city views",
    },
    {
      title: "Photography Tour",
      duration: "Full Day",
      price: "2,200 ETB per person",
      groupSize: "2-6 people",
      includes: ["Best photo spots", "Professional guidance", "Cultural interactions", "Sunset viewing"],
      description: "Capture the essence of Addis Ababa with guided photography at iconic locations",
    },
  ]

  const services = [
    {
      title: "Custom Tour Planning",
      description: "Personalized itineraries based on your interests and schedule",
      icon: MapPin,
      features: ["Flexible scheduling", "Interest-based customization", "Group size adaptation", "Budget optimization"],
    },
    {
      title: "Professional Guiding",
      description: "Expert local knowledge with multilingual guide services",
      icon: Users,
      features: ["English, Amharic, French", "Historical expertise", "Cultural insights", "Safety prioritization"],
    },
    {
      title: "Transportation Services",
      description: "Comfortable and reliable transportation for all tour activities",
      icon: Plane,
      features: ["Modern vehicles", "Experienced drivers", "Airport transfers", "Inter-city travel"],
    },
    {
      title: "Cultural Experiences",
      description: "Authentic Ethiopian cultural immersion and traditional activities",
      icon: Star,
      features: ["Coffee ceremonies", "Traditional meals", "Cultural performances", "Local interactions"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Hero Image */}
          <div className="relative mb-12 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-yellow-900/90"></div>
            <img
              src="/images/img_20201023_072802_649.jpg"
              alt="Addis Ababa Tourism and Ethiopian Heritage"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Ethiopian Tourism & Cultural Tours</h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Discover the rich heritage of Ethiopia through expertly guided tours of Addis Ababa's most significant
                  historical, cultural, and natural attractions
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {tourismMetrics.map((metric, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${metric.color} bg-opacity-10`}
                  >
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Addis Ababa Attractions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Addis Ababa Tourist Attractions</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {addisAbabaAttractions.map((attraction, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={attraction.image || "/placeholder.svg"}
                      alt={attraction.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600">{attraction.category}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 text-gray-900">
                        {attraction.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{attraction.name}</CardTitle>
                    <p className="text-gray-700">{attraction.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {attraction.duration}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {attraction.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
                        <ul className="space-y-1">
                          {attraction.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          <strong>Best Time:</strong> {attraction.bestTime}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tour Packages */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tour Packages</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tourPackages.map((pkg, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{pkg.title}</CardTitle>
                      <Badge variant="outline">{pkg.duration}</Badge>
                    </div>
                    <p className="text-gray-700">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">{pkg.price}</span>
                        <span className="text-sm text-gray-500">{pkg.groupSize}</span>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
                        <div className="flex flex-wrap gap-2">
                          {pkg.includes.map((item, iIndex) => (
                            <Badge key={iIndex} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book This Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tourism Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tourism Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                      <service.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Ethiopian Culture Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Experience Ethiopian Culture</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/images/ethiopian-coffee-ceremony.jpg"
                  alt="Ethiopian Coffee Ceremony"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional Coffee Ceremony</h3>
                  <p className="text-gray-600">
                    Experience the birthplace of coffee with authentic Ethiopian coffee ceremonies, a sacred ritual that
                    brings communities together.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ethiopian Cuisine</h3>
                  <p className="text-gray-600">
                    Taste traditional dishes like injera, doro wat, and kitfo while learning about Ethiopian culinary
                    traditions and spice culture.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cultural Performances</h3>
                  <p className="text-gray-600">
                    Enjoy traditional music and dance performances showcasing the diverse cultural heritage of
                    Ethiopia's many ethnic groups.
                  </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Camera className="mr-2 h-4 w-4" />
                  Book Cultural Experience
                </Button>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tourist Testimonials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-green-50">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 italic">
                    "Eyob's knowledge of Ethiopian history is incredible. The Grand Palace tour was fascinating, and his
                    storytelling brought the imperial history to life!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-semibold">JS</span>
                    </div>
                    <div>
                      <p className="font-semibold">James Smith</p>
                      <p className="text-sm text-gray-600">Tourist from UK</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 italic">
                    "The Adwa Museum visit was deeply moving. Eyob explained the historical significance with such
                    passion and detail. Highly recommended!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                      <span className="text-yellow-700 font-semibold">MK</span>
                    </div>
                    <div>
                      <p className="font-semibold">Marie Kowalski</p>
                      <p className="text-sm text-gray-600">Tourist from Poland</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 italic">
                    "Perfect blend of history, culture, and nature. The Entoto Mountain views were breathtaking, and the
                    cultural experiences were authentic."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 font-semibold">AL</span>
                    </div>
                    <div>
                      <p className="font-semibold">Anna Lopez</p>
                      <p className="text-sm text-gray-600">Tourist from Spain</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Ethiopian Heritage?</h2>
            <p className="text-xl mb-6 text-green-100">
              Book your personalized tour of Addis Ababa's most significant historical and cultural sites
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Calendar className="mr-2 h-4 w-4" />
                Book Your Tour Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Custom Itinerary
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
