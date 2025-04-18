"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { type Quote, getRandomQuote } from "@/lib/quotes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Share2, Search, Grid3X3 } from "lucide-react"
import { Share } from "@/components/share-buttons"
import { CategoryBadge } from "@/components/category-badge"

interface QuoteDisplayProps {
  initialQuote: Quote
  isStatic?: boolean
}

// Separate component for share links to wrap in Suspense
function ShareLinks({ quote, isLink = false }: { quote: Quote; isLink?: boolean }) {
  return <Share quote={quote.text} slug={quote.slug} isLink={isLink} />
}

export function QuoteDisplay({ initialQuote, isStatic = false }: QuoteDisplayProps) {
  const [quote, setQuote] = useState<Quote>(initialQuote)
  const router = useRouter()
  const pathname = usePathname()

  // Update quote state when initialQuote prop changes
  useEffect(() => {
    setQuote(initialQuote)
  }, [initialQuote])

  // Load a new random quote without page navigation
  const loadNewQuote = () => {
    const newQuote = getRandomQuote()
    setQuote(newQuote)

    // Update the URL to match the new quote
    if (!isStatic) {
      router.push(`/insult/${newQuote.slug}`)
    }
  }

  // Get a random quote for the "Give me another one" button on static pages
  const getRandomQuoteForButton = (): string => {
    const randomQuote = getRandomQuote()
    // Make sure we don't get the same quote
    if (randomQuote.slug === quote.slug) {
      return getRandomQuoteForButton()
    }
    return randomQuote.slug
  }

  // Navigate to search page
  const goToSearch = () => {
    router.push("/search")
  }

  return (
    <div className="max-w-xl w-full space-y-6">
      <div className="text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 font-title">
            Lovely Insults
          </h1>
        </Link>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Witty comebacks that don't cross the line</p>
      </div>

      <Card className="border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
        <CardContent className="pt-8 pb-8 px-8">
          {/* Quote section */}
          <div className="px-6 py-8">
            <blockquote className="text-4xl text-center font-medium text-gray-800 dark:text-gray-100 font-quote relative">
              <span className="absolute -left-3 -top-8 text-6xl text-gray-300 dark:text-gray-600 font-quote-marks leading-none">
                "
              </span>
              {quote.text}
              <span className="absolute -right-3 -bottom-8 text-6xl text-gray-300 dark:text-gray-600 font-quote-marks leading-none">
                "
              </span>
            </blockquote>
          </div>
        </CardContent>
      </Card>

      {quote.categories && quote.categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-4 mb-6">
          {quote.categories.map((category) => (
            <CategoryBadge key={category} category={category} variant="discreet" />
          ))}
        </div>
      )}

      {/* Button outside the card */}
      <div className="flex justify-center items-center">
        {isStatic ? (
          <Link href={`/insult/${getRandomQuoteForButton()}`} passHref>
            <Button
              variant="outline"
              className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-all"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Give me another one
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-all"
            onClick={loadNewQuote}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Give me another one
          </Button>
        )}
      </div>

      {/* Responsive footer - split into two rows on mobile */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm mt-8">
        {/* First row on mobile / left side on desktop */}
        <div className="flex space-x-6">
          <div className="inline-block">
            <Suspense
              fallback={
                <span className="text-gray-600 dark:text-gray-300 flex items-center">
                  <Share2 className="mr-1.5 h-3.5 w-3.5" />
                  Share
                </span>
              }
            >
              <ShareLinks quote={quote} isLink={true} />
            </Suspense>
          </div>
        </div>

        {/* Second row on mobile / right side on desktop */}
        <div className="flex space-x-6">
          <Link href="/browse" className="text-gray-600 dark:text-gray-300 hover:underline flex items-center">
            <Grid3X3 className="mr-1.5 h-3.5 w-3.5" />
            Browse All
          </Link>

          <Link href="/search" className="text-gray-600 dark:text-gray-300 hover:underline flex items-center">
            <Search className="mr-1.5 h-3.5 w-3.5" />
            Search
          </Link>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Lovely Insults. All rights reserved.
      </footer>
    </div>
  )
}
