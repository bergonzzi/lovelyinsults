import type { MetadataRoute } from "next"
import { getAllQuoteSlugs } from "@/lib/quotes"

// Define your website URL
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lovelyinsults.com"

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all quote slugs
  const quoteSlugs = getAllQuoteSlugs()

  // Create sitemap entries for all quotes
  const quoteUrls = quoteSlugs.map((slug) => ({
    url: `${BASE_URL}/insult/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Add other important pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
  ]

  // Combine all URLs
  return [...staticPages, ...quoteUrls]
}
