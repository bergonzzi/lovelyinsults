import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getQuoteBySlug, getAllQuoteSlugs } from "@/lib/quotes"
import { QuoteDisplay } from "@/components/quote-display"

// Generate static params for all quotes
export async function generateStaticParams() {
  const slugs = getAllQuoteSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for each quote page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const quote = getQuoteBySlug(params.slug)

  if (!quote) {
    return {
      title: "Quote Not Found - Lovely Insults",
      description: "The requested witty comeback could not be found.",
    }
  }

  // Get the base URL and ensure it uses HTTPS
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lovelyinsults.com"
  if (baseUrl.startsWith("http://")) {
    baseUrl = baseUrl.replace("http://", "https://")
  } else if (!baseUrl.startsWith("https://")) {
    baseUrl = "https://" + baseUrl
  }

  const url = `${baseUrl}/insult/${params.slug}`

  // Format categories for display
  const categoriesText =
    quote.categories && quote.categories.length > 0 ? ` | Categories: ${quote.categories.join(", ")}` : ""

  // Format categories for keywords
  const keywords = ["insult", "comeback", "witty", "clever", ...(quote.categories || [])]

  return {
    title: `"${quote.text}" - Lovely Insults${categoriesText}`,
    description: `A witty, non-swearing comeback: ${quote.text}. ${
      quote.categories && quote.categories.length > 0 ? `Categories: ${quote.categories.join(", ")}.` : ""
    }`,
    keywords: keywords,
    openGraph: {
      title: `"${quote.text}" - Lovely Insults`,
      description: `A witty, non-swearing comeback. ${
        quote.categories && quote.categories.length > 0 ? `Categories: ${quote.categories.join(", ")}.` : ""
      }`,
      type: "website",
      url: url,
      tags: quote.categories || [],
    },
    twitter: {
      card: "summary",
      title: `"${quote.text}" - Lovely Insults`,
      description: `A witty, non-swearing comeback. ${
        quote.categories && quote.categories.length > 0 ? `Categories: ${quote.categories.join(", ")}.` : ""
      }`,
    },
  }
}

export default function QuotePage({ params }: { params: { slug: string } }) {
  const quote = getQuoteBySlug(params.slug)

  // If quote doesn't exist, show 404
  if (!quote) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <QuoteDisplay initialQuote={quote} isStatic={true} />
    </main>
  )
}
