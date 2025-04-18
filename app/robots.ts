import type { MetadataRoute } from "next"

// Define your website URL
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lovelyinsults.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
