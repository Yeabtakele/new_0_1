"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "am" | "fr" | "sw"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.profile": "Profile",
    "nav.sales": "Sales & Marketing",
    "nav.media": "Media Production",
    "nav.community": "Community",
    "nav.tourism": "Tourism",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // Home Page
    "home.hero.badge": "Trusted Service Provider",
    "home.hero.title": "Your Trusted Partner for Tourism, Media, and Community Solutions",
    "home.hero.tagline":
      "With over a decade of experience in tour consulting, media production, and social impact projects, Eyob Salemot delivers reliable services for clients across Ethiopia and beyond.",
    "home.hero.cta.bookTour": "Book a Tour Consultation",
    "home.hero.cta.exploreServices": "Explore My Services",
    "home.hero.cta.chat": "Chat with Me",
    "home.hero.imageAlt": "Eyob Salemot Professional Photo",
    "home.hero.availability": "Available for Projects",

    // Stats
    "home.stats.experience": "Years Experience",
    "home.stats.clients": "Happy Clients",
    "home.stats.languages": "Languages",
    "home.stats.projects": "Projects Completed",

    // Services
    "home.services.title": "My Services",
    "home.services.subtitle": "Comprehensive solutions across multiple domains",
    "home.services.sales.title": "Sales & Marketing",
    "home.services.sales.description": "Strategic marketing campaigns and sales optimization",
    "home.services.media.title": "Media Production",
    "home.services.media.description": "Content creation, journalism, and media consulting",
    "home.services.community.title": "Community Organizing",
    "home.services.community.description": "Community development and project management",
    "home.services.tourism.title": "Tourism Consulting",
    "home.services.tourism.description": "Travel planning and tourism business consulting",

    // CTA
    "home.cta.title": "Ready to Work Together?",
    "home.cta.subtitle": "Let's discuss your project and create something amazing",
    "home.cta.book": "Book Consultation",
    "home.cta.contact": "Get in Touch",

    // Footer
    "footer.description":
      "Professional consultant specializing in sales, marketing, media production, and community development.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact Info",
    "footer.newsletter": "Newsletter",
    "footer.newsletterDesc": "Stay updated with my latest insights and projects",
    "footer.emailPlaceholder": "Enter your email",
    "footer.subscribe": "Subscribe",
    "footer.rights": "All rights reserved.",

    // Chatbot
    "chatbot.title": "Chat Assistant",
    "chatbot.welcome": "Hello! I'm here to help you learn more about Eyob's services. How can I assist you today?",
    "chatbot.placeholder": "Type your message...",
    "chatbot.quickReplies.services": "What services do you offer?",
    "chatbot.quickReplies.booking": "How can I book a consultation?",
    "chatbot.quickReplies.portfolio": "Show me your portfolio",
    "chatbot.quickReplies.contact": "Contact information",
    "chatbot.responses.services":
      "I offer services in Sales & Marketing, Media Production, Community Organizing, and Tourism Consulting. Each service is tailored to meet specific client needs.",
    "chatbot.responses.booking":
      'You can book a consultation by clicking the "Book Consultation" button on the homepage or visiting the contact page. I\'ll get back to you within 24 hours.',
    "chatbot.responses.portfolio":
      "You can explore my portfolio sections for Sales & Marketing, Media Production, Community work, and Tourism projects. Each section showcases detailed case studies and achievements.",
    "chatbot.responses.contact":
      "You can reach me at eyobmind@gmail.com or +251 913 300 282. I'm based in Addis Ababa, Ethiopia.",
    "chatbot.responses.default":
      "Thank you for your question! For detailed information, please explore the relevant sections of my website or contact me directly.",
  },
  am: {
    // Navigation (Amharic)
    "nav.home": "መነሻ",
    "nav.profile": "መገለጫ",
    "nav.sales": "ሽያጭ እና ማርኬቲንግ",
    "nav.media": "ሚዲያ ምርት",
    "nav.community": "ማህበረሰብ",
    "nav.tourism": "ቱሪዝም",
    "nav.blog": "ብሎግ",
    "nav.contact": "ግንኙነት",

    // Home Page (Amharic)
    "home.hero.badge": "የታመነ አገልግሎት ሰጪ",
    "home.hero.title": "ለቱሪዝም፣ ሚዲያ እና የማህበረሰብ መፍትሄዎች የታመነ አጋርዎ",
    "home.hero.tagline":
      "ከአስር አመት በላይ በቱር አማካሪነት፣ ሚዲያ ምርት እና የማህበራዊ ተፅዕኖ ፕሮጀክቶች ልምድ ያለው እዮብ ሳለሞት በኢትዮጵያ እና ከዚያ በላይ ላሉ ደንበኞች አስተማማኝ አገልግሎቶችን ይሰጣል።",
    "home.hero.cta.bookTour": "የቱር ምክክር ይያዙ",
    "home.hero.cta.exploreServices": "አገልግሎቶቼን ይመልከቱ",
    "home.hero.cta.chat": "ከእኔ ጋር ይወያዩ",

    // Continue with other Amharic translations...
    "home.stats.experience": "አመታት ልምድ",
    "home.stats.clients": "ደስተኛ ደንበኞች",
    "home.stats.languages": "ቋንቋዎች",
    "home.stats.projects": "የተጠናቀቁ ፕሮጀክቶች",

    "home.services.title": "የእኔ አገልግሎቶች",
    "home.services.subtitle": "በብዙ ዘርፎች ላይ አጠቃላይ መፍትሄዎች",
    "home.services.sales.title": "ሽያጭ እና ማርኬቲንግ",
    "home.services.sales.description": "ስትራቴጂካዊ የማርኬቲንግ ዘመቻዎች እና የሽያጭ ማሻሻያ",
    "home.services.media.title": "ሚዲያ ምርት",
    "home.services.media.description": "የይዘት ፈጠራ፣ ጋዜጠኝነት እና የሚዲያ አማካሪነት",
    "home.services.community.title": "የማህበረሰብ አደረጃጀት",
    "home.services.community.description": "የማህበረሰብ ልማት እና የፕሮጀክት አስተዳደር",
    "home.services.tourism.title": "የቱሪዝም አማካሪነት",
    "home.services.tourism.description": "የጉዞ እቅድ እና የቱሪዝም ንግድ አማካሪነት",

    "home.cta.title": "አብረን ለመስራት ዝግጁ ነዎት?",
    "home.cta.subtitle": "ስለ ፕሮጀክትዎ እንወያይ እና አስደናቂ ነገር እንፍጠር",
    "home.cta.book": "ምክክር ይያዙ",
    "home.cta.contact": "ይገናኙ",

    "footer.description": "በሽያጭ፣ ማርኬቲንግ፣ ሚዲያ ምርት እና የማህበረሰብ ልማት ላይ የተካነ ሙያዊ አማካሪ።",
    "footer.quickLinks": "ፈጣን አገናኞች",
    "footer.contact": "የግንኙነት መረጃ",
    "footer.newsletter": "ዜና መልእክት",
    "footer.newsletterDesc": "ከእኔ የቅርብ ግንዛቤዎች እና ፕሮጀክቶች ጋር ይዘምኑ",
    "footer.emailPlaceholder": "ኢሜልዎን ያስገቡ",
    "footer.subscribe": "ይመዝገቡ",
    "footer.rights": "ሁሉም መብቶች የተጠበቁ ናቸው።",

    "chatbot.title": "የውይይት ረዳት",
    "chatbot.welcome": "ሰላም! ስለ እዮብ አገልግሎቶች የበለጠ እንዲያውቁ ለመርዳት እዚህ ነኝ። ዛሬ እንዴት ልረዳዎት እችላለሁ?",
    "chatbot.placeholder": "መልእክትዎን ይተይቡ...",
    "chatbot.quickReplies.services": "ምን አገልግሎቶች ትሰጣለህ?",
    "chatbot.quickReplies.booking": "ምክክር እንዴት ማስያዝ እችላለሁ?",
    "chatbot.quickReplies.portfolio": "ፖርትፎሊዮህን አሳየኝ",
    "chatbot.quickReplies.contact": "የግንኙነት መረጃ",
    "chatbot.responses.services":
      "በሽያጭ እና ማርኬቲንግ፣ ሚዲያ ምርት፣ የማህበረሰብ አደረጃጀት እና የቱሪዝም አማካሪነት አገልግሎቶች እሰጣለሁ። እያንዳንዱ አገልግሎት የተወሰኑ የደንበኛ ፍላጎቶችን ለማሟላት የተዘጋጀ ነው።",
    "chatbot.responses.booking":
      'በመነሻ ገጽ ላይ "ምክክር ይያዙ" የሚለውን ቁልፍ በመጫን ወይም የግንኙነት ገጽን በመጎብኘት ምክክር ማስያዝ ይችላሉ። በ24 ሰዓት ውስጥ እመልሳለሁ።',
    "chatbot.responses.portfolio":
      "ለሽያጭ እና ማርኬቲንግ፣ ሚዲያ ምርት፣ የማህበረሰብ ስራ እና የቱሪዝም ፕሮጀክቶች የእኔን የፖርትፎሊዮ ክፍሎች መመልከት ይችላሉ። እያንዳንዱ ክፍል ዝርዝር የጉዳይ ጥናቶችን እና ስኬቶችን ያሳያል።",
    "chatbot.responses.contact": "በ eyobmind@gmail.com ወይም +251 913 300 282 ማግኘት ይችላሉ። በአዲስ አበባ፣ ኢትዮጵያ ውስጥ ነኝ።",
    "chatbot.responses.default": "ለጥያቄዎ እናመሰግናለን! ለዝርዝር መረጃ፣ እባክዎ የእኔን ድረ-ገጽ ተዛማጅ ክፍሎች ይመልከቱ ወይም በቀጥታ ያግኙኝ።",
  },
  fr: {
    // Navigation (French)
    "nav.home": "Accueil",
    "nav.profile": "Profil",
    "nav.sales": "Ventes et Marketing",
    "nav.media": "Production Média",
    "nav.community": "Communauté",
    "nav.tourism": "Tourisme",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // Home Page (French)
    "home.hero.badge": "Fournisseur de Services de Confiance",
    "home.hero.title": "Votre Partenaire de Confiance pour le Tourisme, les Médias et les Solutions Communautaires",
    "home.hero.tagline":
      "Avec plus d'une décennie d'expérience en conseil touristique, production média et projets d'impact social, Eyob Salemot offre des services fiables aux clients à travers l'Éthiopie et au-delà.",
    "home.hero.cta.bookTour": "Réserver une Consultation Touristique",
    "home.hero.cta.exploreServices": "Explorer Mes Services",
    "home.hero.cta.chat": "Discuter avec Moi",
    "home.hero.imageAlt": "Photo Professionnelle d'Eyob Salemot",
    "home.hero.availability": "Disponible pour Projets",

    "home.stats.experience": "Années d'Expérience",
    "home.stats.clients": "Clients Satisfaits",
    "home.stats.languages": "Langues",
    "home.stats.projects": "Projets Terminés",

    "home.services.title": "Mes Services",
    "home.services.subtitle": "Solutions complètes dans plusieurs domaines",
    "home.services.sales.title": "Ventes et Marketing",
    "home.services.sales.description": "Campagnes marketing stratégiques et optimisation des ventes",
    "home.services.media.title": "Production Média",
    "home.services.media.description": "Création de contenu, journalisme et conseil média",
    "home.services.community.title": "Organisation Communautaire",
    "home.services.community.description": "Développement communautaire et gestion de projet",
    "home.services.tourism.title": "Conseil en Tourisme",
    "home.services.tourism.description": "Planification de voyage et conseil en entreprise touristique",

    "home.cta.title": "Prêt à Travailler Ensemble?",
    "home.cta.subtitle": "Discutons de votre projet et créons quelque chose d'incroyable",
    "home.cta.book": "Réserver Consultation",
    "home.cta.contact": "Prendre Contact",

    "footer.description":
      "Consultant professionnel spécialisé en ventes, marketing, production média et développement communautaire.",
    "footer.quickLinks": "Liens Rapides",
    "footer.contact": "Infos Contact",
    "footer.newsletter": "Newsletter",
    "footer.newsletterDesc": "Restez informé de mes dernières perspectives et projets",
    "footer.emailPlaceholder": "Entrez votre email",
    "footer.subscribe": "S'abonner",
    "footer.rights": "Tous droits réservés.",

    "chatbot.title": "Assistant Chat",
    "chatbot.welcome":
      "Bonjour! Je suis là pour vous aider à en savoir plus sur les services d'Eyob. Comment puis-je vous aider aujourd'hui?",
    "chatbot.placeholder": "Tapez votre message...",
    "chatbot.quickReplies.services": "Quels services offrez-vous?",
    "chatbot.quickReplies.booking": "Comment puis-je réserver une consultation?",
    "chatbot.quickReplies.portfolio": "Montrez-moi votre portfolio",
    "chatbot.quickReplies.contact": "Informations de contact",
    "chatbot.responses.services":
      "J'offre des services en Ventes et Marketing, Production Média, Organisation Communautaire et Conseil en Tourisme. Chaque service est adapté aux besoins spécifiques du client.",
    "chatbot.responses.booking":
      'Vous pouvez réserver une consultation en cliquant sur le bouton "Réserver Consultation" sur la page d\'accueil ou en visitant la page contact. Je vous répondrai dans les 24 heures.',
    "chatbot.responses.portfolio":
      "Vous pouvez explorer mes sections portfolio pour Ventes et Marketing, Production Média, travail Communautaire et projets Touristiques. Chaque section présente des études de cas détaillées et des réalisations.",
    "chatbot.responses.contact":
      "Vous pouvez me joindre à eyobmind@gmail.com ou +251 913 300 282. Je suis basé à Addis-Abeba, Éthiopie.",
    "chatbot.responses.default":
      "Merci pour votre question! Pour des informations détaillées, veuillez explorer les sections pertinentes de mon site web ou me contacter directement.",
  },
  sw: {
    // Navigation (Swahili)
    "nav.home": "Nyumbani",
    "nav.profile": "Wasifu",
    "nav.sales": "Mauzo na Uuzaji",
    "nav.media": "Uzalishaji wa Vyombo",
    "nav.community": "Jamii",
    "nav.tourism": "Utalii",
    "nav.blog": "Blogu",
    "nav.contact": "Mawasiliano",

    // Home Page (Swahili)
    "home.hero.badge": "Mtoa Huduma wa Kuaminika",
    "home.hero.title": "Mshirika Wako wa Kuaminika kwa Utalii, Vyombo vya Habari, na Suluhisho za Jamii",
    "home.hero.tagline":
      "Kwa uzoefu wa zaidi ya muongo mmoja katika ushauri wa utalii, uzalishaji wa vyombo vya habari, na miradi ya athari za kijamii, Eyob Salemot anatoa huduma za kuaminika kwa wateja kote Ethiopia na zaidi.",
    "home.hero.cta.bookTour": "Weka Mazungumzo ya Utalii",
    "home.hero.cta.exploreServices": "Chunguza Huduma Zangu",
    "home.hero.cta.chat": "Zungumza Nami",
    "home.hero.imageAlt": "Picha ya Kitaaluma ya Eyob Salemot",
    "home.hero.availability": "Ipo kwa Miradi",

    "home.stats.experience": "Miaka ya Uzoefu",
    "home.stats.clients": "Wateja Wenye Furaha",
    "home.stats.languages": "Lugha",
    "home.stats.projects": "Miradi Iliyokamilika",

    "home.services.title": "Huduma Zangu",
    "home.services.subtitle": "Suluhisho kamili katika nyanja nyingi",
    "home.services.sales.title": "Mauzo na Uuzaji",
    "home.services.sales.description": "Kampeni za kimkakati za uuzaji na kuboresha mauzo",
    "home.services.media.title": "Uzalishaji wa Vyombo",
    "home.services.media.description": "Uundaji wa maudhui, uandishi wa habari na ushauri wa vyombo",
    "home.services.community.title": "Upangaji wa Jamii",
    "home.services.community.description": "Maendeleo ya jamii na usimamizi wa miradi",
    "home.services.tourism.title": "Ushauri wa Utalii",
    "home.services.tourism.description": "Upangaji wa safari na ushauri wa biashara ya utalii",

    "home.cta.title": "Tayari Kufanya Kazi Pamoja?",
    "home.cta.subtitle": "Hebu tujadili mradi wako na tuunde kitu cha ajabu",
    "home.cta.book": "Weka Mazungumzo",
    "home.cta.contact": "Wasiliana",

    "footer.description":
      "Mshauri wa kitaaluma anayefanya kazi katika mauzo, uuzaji, uzalishaji wa vyombo na maendeleo ya jamii.",
    "footer.quickLinks": "Viungo vya Haraka",
    "footer.contact": "Maelezo ya Mawasiliano",
    "footer.newsletter": "Jarida",
    "footer.newsletterDesc": "Baki ukijua kuhusu miwongozo yangu ya hivi karibuni na miradi",
    "footer.emailPlaceholder": "Ingiza barua pepe yako",
    "footer.subscribe": "Jiunge",
    "footer.rights": "Haki zote zimehifadhiwa.",

    "chatbot.title": "Msaidizi wa Mazungumzo",
    "chatbot.welcome": "Hujambo! Nipo hapa kukusaidia ujue zaidi kuhusu huduma za Eyob. Ninawezaje kukusaidia leo?",
    "chatbot.placeholder": "Andika ujumbe wako...",
    "chatbot.quickReplies.services": "Unatoa huduma gani?",
    "chatbot.quickReplies.booking": "Ninawezaje kuweka mazungumzo?",
    "chatbot.quickReplies.portfolio": "Nionyeshe kazi zako",
    "chatbot.quickReplies.contact": "Maelezo ya mawasiliano",
    "chatbot.responses.services":
      "Ninatoa huduma katika Mauzo na Uuzaji, Uzalishaji wa Vyombo, Upangaji wa Jamii, na Ushauri wa Utalii. Kila huduma imepangwa kulingana na mahitaji maalum ya mteja.",
    "chatbot.responses.booking":
      'Unaweza kuweka mazungumzo kwa kubofya kitufe cha "Weka Mazungumzo" kwenye ukurasa wa nyumbani au kutembelea ukurasa wa mawasiliano. Nitakujibu ndani ya masaa 24.',
    "chatbot.responses.portfolio":
      "Unaweza kuchunguza sehemu za kazi zangu za Mauzo na Uuzaji, Uzalishaji wa Vyombo, kazi za Jamii, na miradi ya Utalii. Kila sehemu inaonyesha utafiti wa kina wa kesi na mafanikio.",
    "chatbot.responses.contact":
      "Unaweza kunifikia kwa eyobmind@gmail.com au +251 913 300 282. Niko Addis Ababa, Ethiopia.",
    "chatbot.responses.default":
      "Asante kwa swali lako! Kwa maelezo ya kina, tafadhali chunguza sehemu husika za tovuti yangu au niwasiliane moja kwa moja.",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "am", "fr", "sw"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
