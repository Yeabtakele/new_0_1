"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Bot, User } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatBotProps {
  onClose: () => void
}

export function ChatBot({ onClose }: ChatBotProps) {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t("chatbot.welcome"),
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const quickReplies = [
    t("chatbot.quickReplies.services"),
    t("chatbot.quickReplies.booking"),
    t("chatbot.quickReplies.portfolio"),
    t("chatbot.quickReplies.contact"),
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (message: string = input) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(message, language)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (message: string, lang: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("service") || lowerMessage.includes("what do you do")) {
      return t("chatbot.responses.services")
    } else if (lowerMessage.includes("book") || lowerMessage.includes("appointment")) {
      return t("chatbot.responses.booking")
    } else if (lowerMessage.includes("portfolio") || lowerMessage.includes("work")) {
      return t("chatbot.responses.portfolio")
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach")) {
      return t("chatbot.responses.contact")
    } else {
      return t("chatbot.responses.default")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-4 z-50">
      <Card className="w-full max-w-md h-[500px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            {t("chatbot.title")}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-blue-600" />}
                      {message.sender === "user" && <User className="h-4 w-4 mt-0.5" />}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Replies */}
          <div className="p-4 border-t">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickReplies.map((reply, index) => (
                <Button key={index} variant="outline" size="sm" onClick={() => handleSend(reply)} className="text-xs">
                  {reply}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chatbot.placeholder")}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={() => handleSend()} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
