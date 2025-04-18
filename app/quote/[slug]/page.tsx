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

  return {
    title: `"${quote.text}" - Lovely Insults`,
    description: `A witty, non-swearing comeback: ${quote.text}`,
    openGraph: {
      title: `"${quote.text}" - Lovely Insults`,
      description: "A collection of witty, non-swearing comebacks and insults.",
      type: "website",
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
