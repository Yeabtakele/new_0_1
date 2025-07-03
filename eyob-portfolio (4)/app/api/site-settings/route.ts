import { NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get("locale") || "en"

    const settings = await strapi.getSiteSettings(locale)

    if (!settings) {
      return NextResponse.json({
        success: true,
        settings: {
          siteName: "Eyob Salemot",
          siteDescription: "Tourism, Media & Community Solutions",
          contactEmail: "contact@eyobsalemot.com",
          contactPhone: "+251 911 123 456",
          socialMedia: {},
          seo: {},
        },
      })
    }

    const formattedSettings = {
      id: settings.id,
      siteName: settings.attributes.siteName,
      siteDescription: settings.attributes.siteDescription,
      contactEmail: settings.attributes.contactEmail,
      contactPhone: settings.attributes.contactPhone,
      address: settings.attributes.address,
      socialMedia: settings.attributes.socialMedia || {},
      seo: settings.attributes.seo || {},
      logo: settings.attributes.logo?.data
        ? {
            url: settings.attributes.logo.data.attributes.url,
            alt: settings.attributes.logo.data.attributes.alternativeText || settings.attributes.siteName,
          }
        : null,
      favicon: settings.attributes.favicon?.data
        ? {
            url: settings.attributes.favicon.data.attributes.url,
          }
        : null,
      locale: settings.attributes.locale,
      updatedAt: settings.attributes.updatedAt,
    }

    return NextResponse.json({
      success: true,
      settings: formattedSettings,
    })
  } catch (error) {
    console.error("Site settings API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch site settings",
      },
      { status: 500 },
    )
  }
}
