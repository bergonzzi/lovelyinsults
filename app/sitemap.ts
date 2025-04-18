import type { MetadataRoute } from "next"
import { getAllQuoteSlugs, getAllCategories, getQuoteBySlug } from "@/lib/quotes"

// Define your website URL
let BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lovelyinsults.com"

// Ensure the URL uses HTTPS
if (BASE_URL.startsWith("http://")) {
  BASE_URL = BASE_URL.replace("http://", "https://")
} else if (!BASE_URL.startsWith("https://")) {
  BASE_URL = "https://" + BASE_URL
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all quote slugs
  const quoteSlugs = getAllQuoteSlugs()

  // Create sitemap entries for all quotes
  const quoteUrls = quoteSlugs.map((slug) => {
    const quote = getQuoteBySlug(slug)
    return {
      url: `${BASE_URL}/insult/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }
  })

  // Get all categories and create sitemap entries
  const categories = getAllCategories()
  const categoryUrls = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Add other important pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]

  // Combine all URLs
  return [...staticPages, ...categoryUrls, ...quoteUrls]
}
