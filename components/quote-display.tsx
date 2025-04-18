"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { type Quote, getRandomQuote } from "@/lib/quotes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import { Share } from "@/components/share-buttons"

interface QuoteDisplayProps {
  initialQuote: Quote
  isStatic?: boolean
}

// Separate component for share links to wrap in Suspense
function ShareLinks({ quote, isLink = false }: { quote: Quote; isLink?: boolean }) {
  return <Share quote={quote.text} isLink={isLink} />
}

export function QuoteDisplay({ initialQuote, isStatic = false }: QuoteDisplayProps) {
  const [quote, setQuote] = useState<Quote>(initialQuote)
  const router = useRouter()
  const pathname = usePathname()

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

  return (
    <div className="max-w-xl w-full space-y-8">
      <div className="text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 font-title">
            Lovely Insults
          </h1>
        </Link>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Witty comebacks that don't cross the line</p>
      </div>

      <Card className="border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
        <CardContent className="pt-8 pb-10 px-8">
          <div className="relative px-6 py-8">
            <div className="relative">
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
          </div>

          <div className="flex justify-center items-center mt-10">
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
        </CardContent>
      </Card>

      <div className="flex justify-center items-center space-x-6 text-sm">
        <Link href={`/insult/${quote.slug}`} className="text-gray-600 dark:text-gray-300 hover:underline">
          Link to this insult
        </Link>
        <div className="inline-block">
          <Suspense fallback={<span className="text-gray-600 dark:text-gray-300">Share</span>}>
            <ShareLinks quote={quote} isLink={true} />
          </Suspense>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Lovely Insults. All rights reserved.
      </footer>
    </div>
  )
}
