"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Heart, Calendar, Target, BookOpen, Newspaper, TrendingUp } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"

export default function CommunityPage() {
  const { t } = useLanguage()

  const communityMetrics = [
    { icon: Users, label: "Students Trained", value: "300+", color: "text-blue-600" },
    { icon: Heart, label: "Families Helped", value: "150+", color: "text-green-600" },
    { icon: BookOpen, label: "Schools Reached", value: "6+", color: "text-purple-600" },
    { icon: Newspaper, label: "Articles Published", value: "18+", color: "text-orange-600" },
  ]

  const communityExperience = [
    {
      title: "Project Manager",
      organization: "Better Generation",
      period: "2015 - Current",
      type: "Community Development",
      description:
        "Leading comprehensive community development initiatives focused on education, employment, and basic infrastructure for low-income families.",
      achievements: [
        "Provided meals to low-income students, ensuring food security for educational success",
        "Secured jobs for low-income parents to achieve self-sufficiency and family stability",
        "Devised and implemented project to build latrines for low-income households, improving sanitation and health",
        "Developed sustainable community programs with long-term impact",
        "Coordinated with local authorities and stakeholders for project implementation",
        "Managed project budgets and resources effectively",
      ],
      impact: "150+ families directly benefited",
      status: "Ongoing",
    },
    {
      title: "Students, Graduates, and Community Development Expert",
      organization: "Admas University",
      period: "2013 - 2014",
      type: "Educational Leadership",
      description:
        "Comprehensive student affairs and community development role combining academic support with grassroots community engagement.",
      achievements: [
        "Coordinated, planned, and led all student activities across the university",
        "Organized community and grassroots activities to bridge university-community relations",
        "Counseled students on academic, personal, and career development matters",
        "Researched corporate marketing and activities to enhance university partnerships",
        "Developed student leadership programs and initiatives",
        "Created community outreach programs connecting students with local needs",
      ],
      impact: "500+ students supported",
      status: "Completed",
    },
    {
      title: "Founder and President",
      organization: "Vision Anti-Drug Abuse Club",
      period: "2005 - 2008",
      type: "Youth Prevention Program",
      description:
        "Founded and led pioneering drug abuse prevention initiative targeting youth and students across multiple educational institutions.",
      achievements: [
        "Researched to identify the most susceptible segment of the population to drug abuse",
        "Trained over 300 students in over 6 schools on preventing drug abuse",
        "Carried out various trainings on drug abuse prevention and awareness",
        "Developed educational materials and prevention curricula",
        "Built partnerships with schools and educational institutions",
        "Created peer-to-peer education programs for sustainable impact",
      ],
      impact: "300+ students trained across 6 schools",
      status: "Completed",
    },
    {
      title: "Volunteer",
      organization: "Mulat Aid Organization",
      period: "Various Periods",
      type: "Humanitarian Aid",
      description: "Volunteer work supporting humanitarian aid and community development initiatives.",
      achievements: [
        "Participated in community aid and support programs",
        "Contributed to humanitarian relief efforts",
        "Supported vulnerable community members",
        "Received Certificate of Appreciation for dedicated service",
      ],
      impact: "Community-wide support",
      status: "Ongoing",
    },
  ]

  const columnistWork = {
    title: "Community Columnist",
    description: "Published thought leadership articles on community development, social issues, and civic engagement",
    publications: [
      { name: "Sendek Newspaper", articles: "10+ articles", focus: "Community Development" },
      { name: "Habesha Weg", articles: "8+ articles", focus: "Social Issues" },
    ],
    totalArticles: "18+",
    topics: [
      "Community Development",
      "Social Justice",
      "Youth Empowerment",
      "Education Access",
      "Public Health",
      "Economic Development",
    ],
  }

  const projectAreas = [
    {
      title: "Food Security",
      description: "Ensuring access to nutritious meals for students and families",
      icon: Heart,
      projects: ["Student Meal Programs", "Family Food Support", "Nutrition Education"],
    },
    {
      title: "Employment & Economic Development",
      description: "Creating job opportunities and economic empowerment",
      icon: TrendingUp,
      projects: ["Job Placement Programs", "Skills Training", "Microenterprise Support"],
    },
    {
      title: "Infrastructure Development",
      description: "Basic infrastructure improvements for community health",
      icon: Target,
      projects: ["Latrine Construction", "Water Access", "Sanitation Programs"],
    },
    {
      title: "Education & Youth Development",
      description: "Educational support and youth empowerment initiatives",
      icon: BookOpen,
      projects: ["Student Counseling", "Leadership Training", "Academic Support"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Hero Image */}
          <div className="relative mb-12 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-red-900/90"></div>
            <img
              src="/images/baskets.jpg"
              alt="Community Development and Organizing"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Community Organizing & Development</h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Over a decade of dedicated community service, youth development, and social impact initiatives focused on
                  education, employment, health, and sustainable community development.
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {communityMetrics.map((metric, index) => (
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

          {/* Community Experience */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Community Organizing Experience</h2>
            <div className="space-y-8">
              {communityExperience.map((exp, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{exp.title}</CardTitle>
                        <p className="text-blue-600 font-medium text-lg">{exp.organization}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {exp.period}
                          </span>
                          <Badge variant="outline">{exp.type}</Badge>
                          <Badge variant={exp.status === "Ongoing" ? "default" : "secondary"}>{exp.status}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{exp.impact}</div>
                        <div className="text-xs text-gray-500">Impact</div>
                      </div>
                    </div>
                    <p className="text-gray-700">{exp.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium text-gray-900 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Columnist Work */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Community Columnist</h2>
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-6 w-6 text-blue-600" />
                  Published Articles & Commentary
                </CardTitle>
                <p className="text-gray-700">{columnistWork.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Publications:</h4>
                    <div className="space-y-3">
                      {columnistWork.publications.map((pub, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{pub.name}</p>
                            <p className="text-sm text-gray-600">{pub.focus}</p>
                          </div>
                          <Badge variant="outline">{pub.articles}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Article Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {columnistWork.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{columnistWork.totalArticles}</div>
                      <div className="text-sm text-gray-600">Total Articles Published</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Areas */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Focus Areas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectAreas.map((area, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                      <area.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{area.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{area.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {area.projects.map((project, projIndex) => (
                        <li key={projIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{project}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Impact Initiatives</h2>
            <p className="text-xl mb-6 text-blue-100">
              Together, we can create lasting change and empower communities across Ethiopia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Users className="mr-2 h-4 w-4" />
                Get Involved
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Heart className="mr-2 h-4 w-4" />
                Support Our Projects
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
