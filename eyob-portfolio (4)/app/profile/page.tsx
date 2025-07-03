"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Newspaper,
  GraduationCap,
  Send,
  MessageCircle,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"

export default function ProfilePage() {
  const { t } = useLanguage()

  const skills = [
    { name: "Sales & Marketing", level: 95 },
    { name: "Media Production", level: 92 },
    { name: "Community Organizing", level: 95 },
    { name: "Public Relations", level: 90 },
    { name: "Content Marketing", level: 88 },
    { name: "Social Media Management", level: 90 },
    { name: "Project Management", level: 92 },
    { name: "Script Writing", level: 85 },
    { name: "Press Relations", level: 88 },
    { name: "Youth Development", level: 90 },
    { name: "Business Development", level: 88 },
    { name: "Leadership Training", level: 92 },
  ]

  const languages = [
    { name: "English", level: "Native" },
    { name: "Amharic", level: "Native" },
    { name: "French", level: "Fluent" },
    { name: "Swahili", level: "Conversational" },
  ]

  const experience = [
    {
      title: "Marketing Manager",
      company: "Greenroad International",
      period: "2020 - 2025",
      type: "Marketing & Media",
      description:
        "Led comprehensive marketing and sales operations, managing media relations, content strategy, and brand positioning.",
      responsibilities: [
        "Write TV and radio scripts for marketing campaigns",
        "Identify press opportunities through evolving issues",
        "Develop content for press releases, social media, websites, and distribution channels",
        "Ensure key messages align with business strategies",
        "Serve as organization's media liaison and formal spokesperson",
        "Conduct press conferences and briefings",
        "Monitor online and offline campaigns and report on results",
        "Negotiate with media channels to close competitive deals",
        "Build and manage organization's social media profile and presence",
        "Promote projects to support new product launches",
        "Build long-term relationships with media influencers",
        "Manage organization's media budget appropriately",
      ],
    },
    {
      title: "Project Manager",
      company: "Better Generation",
      period: "2015 - Current",
      type: "Community Development",
      description:
        "Leading comprehensive community development initiatives focused on education, employment, and basic infrastructure for low-income families.",
      responsibilities: [
        "Provided meals to low-income students, ensuring food security for educational success",
        "Secured jobs for low-income parents to achieve self-sufficiency and family stability",
        "Devised and implemented project to build latrines for low-income households",
        "Developed sustainable community programs with long-term impact",
        "Coordinated with local authorities and stakeholders for project implementation",
        "Managed project budgets and resources effectively",
      ],
    },
    {
      title: "Head Marketing & Sales Section",
      company: "Various Organizations",
      period: "2017 - 2019",
      type: "Marketing Leadership",
      description:
        "Managed social media, public relations, and content marketing while developing pricing strategies to maximize profit and market share.",
      responsibilities: [
        "Managed social media, public relations, and content marketing",
        "Developed pricing strategies to maximize profit and market share",
        "Exceeded sales targets through strategic marketing initiatives",
        "Led cross-functional teams to achieve marketing objectives",
        "Implemented data-driven marketing campaigns",
        "Coordinated with stakeholders to align marketing with business goals",
      ],
    },
    {
      title: "Sales and Marketing Consultant Expert",
      company: "Independent Consulting",
      period: "February 2015 - 2016",
      type: "Consulting",
      description:
        "Provided strategic marketing consulting services to various clients, developing comprehensive marketing strategies and implementation plans.",
      responsibilities: [
        "Developed and implemented marketing strategies and plans",
        "Advised on branding, positioning, communication and other marketing aspects",
        "Created winning proposals for client projects",
        "Wrote comprehensive reports including strategies for improvements and new ideas",
        "Conducted market analysis and competitive research",
        "Provided training and guidance to client marketing teams",
      ],
    },
    {
      title: "Students, Graduates, and Community Development Expert",
      company: "Admas University",
      period: "2013 - 2014",
      type: "Educational Leadership",
      description:
        "Comprehensive student affairs and community development role combining academic support with grassroots community engagement.",
      responsibilities: [
        "Coordinated, planned, and led all student activities across the university",
        "Organized community and grassroots activities to bridge university-community relations",
        "Counseled students on academic, personal, and career development matters",
        "Researched corporate marketing and activities to enhance university partnerships",
        "Developed student leadership programs and initiatives",
        "Created community outreach programs connecting students with local needs",
      ],
    },
    {
      title: "Data Capture Specialist",
      company: "LonAdd HR Consultants (Ethio-Telecom Project)",
      period: "2014 - 2015",
      type: "Data Management",
      description:
        "Managed data collection and verification processes for major telecommunications infrastructure project.",
      responsibilities: [
        "Compiled, verified accuracy, and sorted information for source documents",
        "Entered customer data on time and accurately",
        "Maintained data quality standards and protocols",
        "Collaborated with project teams to ensure data integrity",
        "Generated reports and analytics from collected data",
      ],
    },
    {
      title: "Founder and President",
      company: "Vision Anti-Drug Abuse Club",
      period: "2005 - 2008",
      type: "Youth Prevention",
      description:
        "Founded and led pioneering drug abuse prevention initiative targeting youth and students across multiple educational institutions.",
      responsibilities: [
        "Researched to identify the most susceptible segment of the population to drug abuse",
        "Trained over 300 students in over 6 schools on preventing drug abuse",
        "Carried out various trainings on drug abuse prevention and awareness",
        "Developed educational materials and prevention curricula",
        "Built partnerships with schools and educational institutions",
        "Created peer-to-peer education programs for sustainable impact",
      ],
    },
  ]

  const education = {
    degree: {
      title: "BA Degree in Business",
      institution: "Admas University",
      year: "2011",
      achievements: [
        "Certificate of Leadership for leading anti-drug and Literature Clubs",
        "Recognition Letter for providing training on Leadership",
      ],
    },
  }

  const certifications = [
    {
      title: "Advanced Certified Social Media Marketing",
      institution: "Z Sprint Technology Institute PLC",
      date: "February 2021",
      type: "Professional Certification",
    },
    {
      title: "Achieving Nutrition Outcome",
      institution: "Civil Society Academy",
      date: "November 2019",
      type: "Specialized Training",
    },
    {
      title: "Community Mobilizing and Event Organizing",
      institution: "AIESEC",
      date: "December 2013",
      type: "Leadership Training",
    },
    {
      title: "Anti-Drug and Peer Education",
      institution: "HIV and Gender Office of Admas University",
      date: "October 2013",
      type: "Specialized Training",
    },
    {
      title: "Leadership and Customer Handling",
      institution: "Ethiopian Marketing Association",
      date: "October 2013",
      type: "Professional Development",
    },
    {
      title: "Business Networking",
      institution: "ZTE University",
      date: "October 2010",
      type: "Business Skills",
    },
  ]

  const achievements = [
    "Led marketing campaigns that increased client revenue by 150%",
    "Successfully managed media budgets exceeding $100K annually",
    "Provided meals and support to 150+ low-income families",
    "Trained over 300 students across 6 schools in drug abuse prevention",
    "Published 18+ articles in major newspapers including Sendek and Habesha Weg",
    "Secured employment for dozens of low-income parents achieving self-sufficiency",
    "Built latrines for low-income households improving community health",
    "Developed and maintained relationships with 50+ media influencers",
    "Wrote and produced 100+ TV and radio scripts",
    "Conducted 25+ press conferences and media briefings",
    "Built social media presence with 100K+ combined followers",
    "Created award-winning marketing proposals with 90% success rate",
    "Managed cross-cultural teams across 4 different languages",
    "Received Certificate of Appreciation from Mulat Aid Organization",
    "Led anti-drug and literature clubs during university years",
    "Recognized for leadership training and community development work",
  ]

  const columnistWork = [
    {
      publication: "Sendek Newspaper",
      articles: "10+ articles",
      focus: "Community Development & Social Issues",
    },
    {
      publication: "Habesha Weg",
      articles: "8+ articles",
      focus: "Community Organizing & Civic Engagement",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-start space-x-6">
                  <img
                    src="/images/eyob-international.jpg"
                    alt="Eyob Salemot at International Conference"
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Eyob Salemot</h1>
                    <p className="text-xl text-gray-600 mb-4">
                      Business Graduate, Marketing Manager & Community Development Leader
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Business Graduate</Badge>
                      <Badge variant="secondary">Marketing Manager</Badge>
                      <Badge variant="secondary">Community Organizer</Badge>
                      <Badge variant="secondary">Media Producer</Badge>
                      <Badge variant="secondary">Columnist</Badge>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Business graduate with over 15 years of experience in marketing, community development, and media
                      production. Specialized in creating social impact through strategic business development,
                      community organizing, and compelling storytelling across multiple platforms and languages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>eyobmind@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+251 913 300 282</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://linkedin.com/in/salesandmarketingmanagersethiopia" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://t.me/youcanwinnow" target="_blank" rel="noopener noreferrer">
                      <Send className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://wa.me/251913300282" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <Button className="w-full" asChild>
                  <a href="/images/eyob resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Professional Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Professional Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-6 relative">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-blue-600 font-medium text-lg">{exp.company}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-gray-500">{exp.period}</p>
                            <Badge variant="outline" className="text-xs">
                              {exp.type}
                            </Badge>
                          </div>
                          <p className="text-gray-700 mb-4 mt-2">{exp.description}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 mb-2">Key Responsibilities:</h4>
                          <ul className="space-y-1">
                            {exp.responsibilities.map((responsibility, respIndex) => (
                              <li key={respIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{responsibility}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Columnist Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5" />
                    Columnist Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Published over 18 articles in multiple media outlets, focusing on community development, social
                    issues, and civic engagement.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {columnistWork.map((work, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900">{work.publication}</h4>
                        <p className="text-blue-600 font-medium">{work.articles}</p>
                        <p className="text-sm text-gray-600">{work.focus}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Key Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {languages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{lang.name}</span>
                        <Badge variant="outline">{lang.level}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900">{education.degree.title}</h3>
                      <p className="text-blue-600 font-medium">{education.degree.institution}</p>
                      <p className="text-sm text-gray-500 mb-3">{education.degree.year}</p>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 text-sm">University Achievements:</h4>
                        {education.degree.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications & Training */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4">
                        <h4 className="font-medium text-gray-900">{cert.title}</h4>
                        <p className="text-blue-600 text-sm">{cert.institution}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-500">{cert.date}</p>
                          <Badge variant="outline" className="text-xs">
                            {cert.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
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
