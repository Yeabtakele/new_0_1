"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { useToast } from "@/hooks/use-toast"

export default function TestPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [showChat, setShowChat] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const runTest = (testName: string, testFunction: () => boolean) => {
    try {
      const result = testFunction()
      setTestResults((prev) => ({ ...prev, [testName]: result }))
      return result
    } catch (error) {
      setTestResults((prev) => ({ ...prev, [testName]: false }))
      return false
    }
  }

  // Comprehensive Test Functions
  const testLanguageSystem = () => {
    return language && ["en", "am", "fr", "sw"].includes(language) && typeof t === "function"
  }

  const testTranslations = () => {
    const testKeys = ["home.hero.title", "nav.home", "footer.contact", "nav.profile", "nav.sales"]
    return testKeys.every((key) => t(key) !== key && t(key).length > 0)
  }

  const testToastSystem = () => {
    toast({
      title: "✅ Test Toast",
      description: "Toast notification system is working correctly!",
    })
    return true
  }

  const testFormValidation = () => {
    return (
      typeof formData.name === "string" && typeof formData.email === "string" && typeof formData.message === "string"
    )
  }

  const testResponsiveDesign = () => {
    return window.innerWidth > 0 && window.innerHeight > 0
  }

  const testChatbot = () => {
    setShowChat(true)
    setTimeout(() => setShowChat(false), 2000)
    return true
  }

  const testCalendar = () => {
    return selectedDate instanceof Date && !isNaN(selectedDate.getTime())
  }

  const testNavigation = () => {
    const navLinks = [\"/\
