"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { href: "/profile", label: t("nav.profile") },
    { href: "/portfolio/sales", label: t("nav.sales") },
    { href: "/portfolio/media", label: t("nav.media") },
    { href: "/community", label: t("nav.community") },
    { href: "/tourism", label: t("nav.tourism") },
    { href: "/blog", label: t("nav.blog") },
  ]

  const contactLinks = [
    { icon: Phone, href: "tel:+251913300282", label: "+251 913 300 282", text: "+251 913 300 282" },
    { icon: Mail, href: "mailto:eyobmind@gmail.com", label: "Email", text: "eyobmind@gmail.com" },
    { icon: Send, href: "https://t.me/youcanwinnow", label: "Telegram", text: "Telegram" },
    { icon: MessageCircle, href: "https://wa.me/251913300282", label: "WhatsApp", text: "WhatsApp" },
    { icon: Linkedin, href: "https://linkedin.com/in/salesandmarketingmanagersethiopia", label: "LinkedIn", text: "LinkedIn" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t("footer.contact")}</h4>
            <div className="space-y-2">
              {contactLinks.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
                  aria-label={contact.label}
                >
                  <contact.icon className="h-4 w-4" />
                  <span>{contact.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 YTK solution.tech</p>
        </div>
      </div>
    </footer>
  )
}
