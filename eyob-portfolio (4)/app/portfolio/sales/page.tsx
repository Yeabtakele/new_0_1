"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Target, DollarSign, Calendar, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"

export default function SalesPortfolioPage() {
  const { t } = useLanguage()

  const mediaMetrics = [
    { icon: DollarSign, label: "Total Revenue Generated", value: "$2.5M+", color: "text-green-600" },
    { icon: TrendingUp, label: "Average ROI", value: "350%", color: "text-blue-600" },
    { icon: Users, label: "Clients Served", value: "50+", color: "text-purple-600" },
    { icon: Target, label: "Campaigns Launched", value: "100+", color: "text-orange-600" },
  ]

  const campaigns = [
    {
      title: "E-commerce Growth Campaign",
      client: "Tech Startup",
      period: "2023",
      results: {
        revenue: "+150%",
        leads: "+300%",
        conversion: "+45%",
      },
      description:
        "Comprehensive digital marketing strategy that transformed a struggling e-commerce platform into a market leader.",
      technologies: ["Google Ads", "Facebook Marketing", "Email Automation", "SEO"],
      image: "/images/E-commerce Growth Campaign.jpg",
    },
    {
      title: "B2B Lead Generation",
      client: "Manufacturing Company",
      period: "2022",
      results: {
        revenue: "+200%",
        leads: "+400%",
        conversion: "+60%",
      },
      description: "Developed and executed a multi-channel B2B marketing strategy targeting enterprise clients.",
      technologies: ["LinkedIn Ads", "Content Marketing", "CRM Integration", "Sales Funnel"],
      image: "/images/B2B Lead Generation.jpg",
    },
    {
      title: "Tourism Marketing Campaign",
      client: "Travel Agency",
      period: "2022",
      results: {
        revenue: "+180%",
        leads: "+250%",
        conversion: "+35%",
      },
      description: "Created compelling tourism marketing campaigns showcasing Ethiopian cultural heritage.",
      technologies: ["Social Media", "Influencer Marketing", "Video Production", "PR"],
      image: "/images/Tourism Marketing Campaign.jpg",
    },
    {
      title: "Local Business Growth",
      client: "Restaurant Chain",
      period: "2021",
      results: {
        revenue: "+120%",
        leads: "+200%",
        conversion: "+40%",
      },
      description: "Boosted local restaurant chain visibility and customer acquisition through targeted campaigns.",
      technologies: ["Local SEO", "Google My Business", "Social Media", "Review Management"],
      image: "/images/Local Business Growth.jpg",
    },
  ]

  const services = [
    {
      title: "Digital Marketing Strategy",
      description: "Comprehensive digital marketing plans tailored to your business goals",
      features: ["Market Analysis", "Competitor Research", "Channel Strategy", "KPI Definition"],
    },
    {
      title: "Lead Generation",
      description: "Proven systems to generate high-quality leads for your business",
      features: ["Landing Page Optimization", "Email Marketing", "Social Media Ads", "Content Marketing"],
    },
    {
      title: "Sales Funnel Optimization",
      description: "Optimize your sales process to maximize conversions",
      features: ["Funnel Analysis", "A/B Testing", "Conversion Optimization", "Customer Journey Mapping"],
    },
    {
      title: "Brand Development",
      description: "Build a strong brand presence that resonates with your audience",
      features: ["Brand Strategy", "Visual Identity", "Messaging Framework", "Brand Guidelines"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Hero Image */}
          <div className="relative mb-12 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>
            <img
              src="/images/Our Marketing Process.jpg"
              alt="Sales and Marketing Strategy"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Sales & Marketing Portfolio</h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Proven track record of driving business growth through strategic marketing campaigns and sales
                  optimization across diverse industries and markets.
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

          {/* Featured Campaigns */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Campaigns</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {campaigns.map((campaign, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 relative">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-900">{campaign.period}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl leading-tight">{campaign.title}</CardTitle>
                    <p className="text-blue-600 font-medium">{campaign.client}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{campaign.description}</p>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{campaign.results.revenue}</div>
                        <div className="text-xs text-gray-500">Revenue</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{campaign.results.leads}</div>
                        <div className="text-xs text-gray-500">Leads</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{campaign.results.conversion}</div>
                        <div className="text-xs text-gray-500">Conversion</div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {campaign.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Case Study
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Marketing Process Section with Visual */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Marketing Process</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/images/Our Marketing Process.jpg"
                  alt="Marketing Process Flow"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Strategy Development</h3>
                    <p className="text-gray-600">Comprehensive market analysis and strategic planning</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Campaign Execution</h3>
                    <p className="text-gray-600">Multi-channel campaign implementation and management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Performance Optimization</h3>
                    <p className="text-gray-600">Continuous monitoring and optimization for maximum ROI</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Results & Reporting</h3>
                    <p className="text-gray-600">Detailed analytics and performance reporting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Marketing Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-gray-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tools & Technologies Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tools & Technologies</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Marketing Technology Stack</h3>
                <p className="text-gray-600">
                  Leveraging cutting-edge tools and platforms to deliver exceptional marketing results and measurable
                  business growth.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Analytics</h4>
                    <p className="text-sm text-gray-600">Google Analytics, Facebook Insights</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Automation</h4>
                    <p className="text-sm text-gray-600">HubSpot, Mailchimp</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Advertising</h4>
                    <p className="text-sm text-gray-600">Google Ads, Facebook Ads</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Design</h4>
                    <p className="text-sm text-gray-600">Canva, Adobe Creative Suite</p>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="/images/Professional Equipment & Tools.jpg"
                  alt="Professional Equipment & Tools"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Let's discuss how I can help you achieve your marketing and sales goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                View All Case Studies
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
