"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Eye, Share2, Award, Camera, Mic, FileText, Globe, Play } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"

export default function MediaPortfolioPage() {
  const { t } = useLanguage()

  const mediaMetrics = [
    { icon: FileText, label: "Articles Published", value: "200+", color: "text-blue-600" },
    { icon: Eye, label: "Total Views", value: "500K+", color: "text-green-600" },
    { icon: Globe, label: "Media Outlets", value: "15+", color: "text-purple-600" },
    { icon: Award, label: "Awards Won", value: "5", color: "text-orange-600" },
  ]

  const featuredCoverage = [
    {
      title: "Ethiopia Hosts Landmark Global Health Innovation Quality Summit 2025",
      outlet: "USS Afrika",
      date: "2025",
      category: "Health & Innovation",
      description:
        "Comprehensive coverage of Ethiopia's landmark Global Health Innovation Quality Summit, highlighting the country's commitment to healthcare advancement and international collaboration.",
      url: "https://russafrik.info/ethiopia-hosts-landmark-global-health-innovation-quality-summit-2025/",
      image: "/images/Global Health Innovation & Quality Summit 2025.jpg",
      tags: ["Health", "Innovation", "Summit", "Ethiopia", "Global Health"],
      impact: "10K+ reads",
      type: "Feature Article",
    },
    {
      title: "Welcome Address by Dr. Serkalem Girma - Ethiopian Public Health Officers Association",
      outlet: "USS Afrika",
      date: "2025",
      category: "Public Health",
      description:
        "Exclusive coverage of Dr. Serkalem Girma's welcome address as President of the Ethiopian Public Health Officers Association, focusing on healthcare leadership and professional development.",
      url: "https://russafrik.info/welcome-address-by-dr-serkalem-girma-president-of-the-ethiopian-public-health-officers-association-phoa-e/",
      image: "/images/_Dr. Serkalem Girma,.jpg",
      tags: ["Public Health", "Leadership", "Healthcare", "Ethiopia", "Professional Development"],
      impact: "8K+ reads",
      type: "Interview Coverage",
    },
  ]

  const mediaServices = [
    {
      title: "Journalism & Reporting",
      description: "In-depth reporting on health, innovation, and community development",
      icon: FileText,
      features: ["Investigative Reporting", "Feature Articles", "News Coverage", "Interview Conducting"],
    },
    {
      title: "Content Creation",
      description: "Engaging content for digital and traditional media platforms",
      icon: Camera,
      features: ["Article Writing", "Press Releases", "Social Media Content", "Blog Posts"],
    },
    {
      title: "Media Consulting",
      description: "Strategic media planning and communication consulting",
      icon: Mic,
      features: ["Media Strategy", "Crisis Communication", "Brand Messaging", "PR Campaigns"],
    },
    {
      title: "Event Coverage",
      description: "Professional coverage of conferences, summits, and community events",
      icon: Globe,
      features: ["Live Reporting", "Event Documentation", "Speaker Interviews", "Summit Coverage"],
    },
  ]

  const additionalWork = [
    {
      title: "Healthcare Innovation Reports",
      outlet: "Various Publications",
      count: "25+ Articles",
      description: "Specialized reporting on healthcare innovations and medical breakthroughs in Ethiopia",
    },
    {
      title: "Community Development Stories",
      outlet: "Local & International Media",
      count: "40+ Features",
      description: "Human interest stories highlighting community development projects and social impact",
    },
    {
      title: "Tourism & Culture Features",
      outlet: "Travel Publications",
      count: "30+ Articles",
      description: "Cultural and tourism articles promoting Ethiopian heritage and destinations",
    },
    {
      title: "Business & Economic Analysis",
      outlet: "Business Media",
      count: "20+ Reports",
      description: "Economic analysis and business reporting on Ethiopian market developments",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Hero Image */}
          <div className="relative mb-12 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90"></div>
            <img
              src="/placeholder.svg?height=400&width=1200&text=Media+Production+%26+Journalism"
              alt="Media Production and Journalism"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Media Production Portfolio</h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Professional journalism, content creation, and media consulting with a focus on health, innovation,
                  community development, and cultural storytelling across Ethiopia and beyond.
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {mediaMetrics.map((metric, index) => (
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

          {/* Media Production Process */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Media Production Process</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/images/midia producation.jpg"
                  alt="Media Production Workflow"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Research & Planning</h3>
                    <p className="text-gray-600">Thorough research and strategic content planning</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Content Creation</h3>
                    <p className="text-gray-600">Professional writing, filming, and content production</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Review & Editing</h3>
                    <p className="text-gray-600">Quality assurance and professional editing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Distribution & Promotion</h3>
                    <p className="text-gray-600">Strategic distribution and audience engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Media Coverage */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Media Coverage</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredCoverage.map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 relative">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-white/90 text-gray-900">
                        {article.type}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-600">{article.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        {article.outlet}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {article.date}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {article.impact}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{article.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button asChild className="w-full">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Read Full Article
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Media Equipment & Studio */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Professional Media Setup</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Professional Equipment & Tools</h3>
                <p className="text-gray-600">
                  State-of-the-art equipment and professional tools for high-quality content creation and media
                  production.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Camera className="h-6 w-6 text-purple-600 mb-2" />
                    <h4 className="font-medium text-gray-900">Video Production</h4>
                    <p className="text-sm text-gray-600">4K cameras, lighting, audio</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Mic className="h-6 w-6 text-purple-600 mb-2" />
                    <h4 className="font-medium text-gray-900">Audio Recording</h4>
                    <p className="text-sm text-gray-600">Professional microphones, mixers</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-600 mb-2" />
                    <h4 className="font-medium text-gray-900">Content Writing</h4>
                    <p className="text-sm text-gray-600">Research tools, editing software</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Play className="h-6 w-6 text-purple-600 mb-2" />
                    <h4 className="font-medium text-gray-900">Post-Production</h4>
                    <p className="text-sm text-gray-600">Editing suites, graphics</p>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="/images/Professional Equipment & Tools.jpg"
                  alt="Media Studio and Equipment"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Media Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Media Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                      <service.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Portfolio Highlights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Portfolio Highlights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {additionalWork.map((work, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{work.title}</CardTitle>
                      <Badge variant="outline">{work.count}</Badge>
                    </div>
                    <p className="text-purple-600 font-medium">{work.outlet}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{work.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Client Testimonials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-purple-50">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 italic">
                    "Eyob's coverage of our health summit was exceptional. His attention to detail and ability to
                    capture the essence of complex healthcare topics made our event reach a much wider audience."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-700 font-semibold">DG</span>
                    </div>
                    <div>
                      <p className="font-semibold">Dr. Sarah Johnson</p>
                      <p className="text-sm text-gray-600">Health Summit Organizer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 italic">
                    "Professional, reliable, and insightful. Eyob's media coverage helped us communicate our public
                    health initiatives effectively to both local and international audiences."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-semibold">AM</span>
                    </div>
                    <div>
                      <p className="font-semibold">Dr. Ahmed Mohammed</p>
                      <p className="text-sm text-gray-600">Public Health Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 italic">
                    "Eyob's storytelling ability is remarkable. He transformed our community development project into
                    compelling narratives that resonated with readers and donors alike."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 font-semibold">MT</span>
                    </div>
                    <div>
                      <p className="font-semibold">Maria Torres</p>
                      <p className="text-sm text-gray-600">NGO Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-purple-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Media Coverage or Content Creation?</h2>
            <p className="text-xl mb-6 text-purple-100">
              Let's discuss how I can help tell your story and reach your target audience effectively
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Media Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                <Share2 className="mr-2 h-4 w-4" />
                View More Samples
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
