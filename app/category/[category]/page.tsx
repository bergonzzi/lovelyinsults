import type { Metadata } from "next"
import { getQuotesByCategory, getAllCategories } from "@/lib/quotes"
import { CategoryPageContent } from "./CategoryPageClient"

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }))
}

// Generate metadata for each category page
export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categorySlug = params.category
  const categoryName =
    decodeURIComponent(categorySlug).charAt(0).toUpperCase() + decodeURIComponent(categorySlug).slice(1)

  const quotes = getQuotesByCategory(categoryName)

  // Get the base URL and ensure it uses HTTPS
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lovelyinsults.com"
  if (baseUrl.startsWith("http://")) {
    baseUrl = baseUrl.replace("http://", "https://")
  } else if (!baseUrl.startsWith("https://")) {
    baseUrl = "https://" + baseUrl
  }

  const url = `${baseUrl}/category/${categorySlug}`

  return {
    title: `${categoryName} Insults - Lovely Insults`,
    description: `Browse our collection of ${quotes.length} witty, non-swearing ${categoryName.toLowerCase()} comebacks and insults.`,
    keywords: ["insult", "comeback", "witty", "clever", categoryName.toLowerCase()],
    openGraph: {
      title: `${categoryName} Insults - Lovely Insults`,
      description: `Browse our collection of ${quotes.length} witty, non-swearing ${categoryName.toLowerCase()} comebacks and insults.`,
      type: "website",
      url: url,
    },
    twitter: {
      card: "summary",
      title: `${categoryName} Insults - Lovely Insults`,
      description: `Browse our collection of ${quotes.length} witty, non-swearing ${categoryName.toLowerCase()} comebacks and insults.`,
    },
  }
}

export default function CategoryPageWrapper({ params }: { params: { category: string } }) {
  return <CategoryPageContent categorySlug={params.category} />
}
