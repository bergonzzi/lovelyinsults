"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { Quote } from "@/lib/quotes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Tag, ChevronLeft, ChevronRight, Home, Grid3X3, Search } from "lucide-react"
import { CategoryBadge } from "@/components/category-badge"
import { getQuotesByCategory } from "@/lib/quotes"

// Number of results per page
const RESULTS_PER_PAGE = 20

// Component that uses window.location.search
function CategoryPageContentInner({ categorySlug }: { categorySlug: string }) {
  const router = useRouter()
  const categoryName =
    decodeURIComponent(categorySlug).charAt(0).toUpperCase() + decodeURIComponent(categorySlug).slice(1)

  const [quotes, setQuotes] = useState<Quote[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  // Get the page from URL
  const [currentPage, setCurrentPage] = useState(1)

  // Update the useEffect to include the router and searchParams
  useEffect(() => {
    // Get the page from URL
    const searchParams = new URLSearchParams(window.location.search)
    const pageParam = searchParams.get("page") || "1"
    const page = Number.parseInt(pageParam, 10) || 1
    setCurrentPage(page)

    setIsLoading(true)
    const categoryQuotes = getQuotesByCategory(categoryName)
    setQuotes(categoryQuotes)
    setTotalPages(Math.max(1, Math.ceil(categoryQuotes.length / RESULTS_PER_PAGE)))
    setIsLoading(false)
  }, [categoryName, window.location.search])

  // Get paginated quotes
  const paginatedQuotes = quotes.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE)

  // Navigate to a specific page
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return

    // Update URL with the new page
    const url = new URL(window.location.href)
    url.searchParams.set("page", page.toString())
    router.push(url.pathname + url.search)

    window.scrollTo(0, 0)
  }

  // Generate pagination links
  const renderPagination = () => {
    if (totalPages <= 1) return null

    return (
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        <div className="text-sm text-gray-500 dark:text-gray-400 px-2">
          Page {currentPage} of {totalPages}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 font-title">
              Lovely Insults
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Witty comebacks that don't cross the line</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              try {
                // Try to go back first
                router.back()
                // If we're still on the same page after a short delay, navigate to home
                setTimeout(() => {
                  if (window.location.pathname.includes(`/category/${categorySlug}`)) {
                    router.push("/")
                  }
                }, 100)
              } catch (e) {
                // Fallback to home if router.back() fails
                router.push("/")
              }
            }}
            className="border-gray-200 dark:border-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Category: {categoryName}
          </h2>

          {isLoading ? (
            <p className="text-center py-8 text-gray-500 dark:text-gray-400">Loading insults...</p>
          ) : quotes.length > 0 ? (
            <div className="space-y-4">
              {paginatedQuotes.map((quote) => (
                <div key={quote.slug} className="group">
                  <Card className="border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <Link href={`/insult/${quote.slug}`} className="block mb-2">
                        <p className="text-gray-800 dark:text-gray-100 font-quote group-hover:underline">
                          "{quote.text}"
                        </p>
                      </Link>

                      {/* Categories */}
                      {quote.categories && quote.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {quote.categories.map((category) => (
                            <CategoryBadge
                              key={category}
                              category={category}
                              variant="discreet"
                              clickable={category !== categoryName}
                              className={
                                category === categoryName ? "font-semibold text-gray-600 dark:text-gray-300" : ""
                              }
                            />
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Found {quotes.length} insult{quotes.length !== 1 ? "s" : ""} in the {categoryName} category
                {quotes.length > RESULTS_PER_PAGE &&
                  ` • Showing ${(currentPage - 1) * RESULTS_PER_PAGE + 1}-${Math.min(
                    currentPage * RESULTS_PER_PAGE,
                    quotes.length,
                  )}`}
              </p>

              {renderPagination()}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No insults found in this category</p>
              <Link href="/" className="mt-4 inline-block">
                <Button variant="outline" className="mt-4 border-gray-200 dark:border-gray-700">
                  Return to Home
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Add footer links */}
        <div className="flex justify-center space-x-6 text-sm">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:underline flex items-center">
            <Home className="mr-1.5 h-3.5 w-3.5" />
            Home
          </Link>
          <Link href="/browse" className="text-gray-600 dark:text-gray-300 hover:underline flex items-center">
            <Grid3X3 className="mr-1.5 h-3.5 w-3.5" />
            Browse All
          </Link>
          <Link href="/search" className="text-gray-600 dark:text-gray-300 hover:underline flex items-center">
            <Search className="mr-1.5 h-3.5 w-3.5" />
            Search
          </Link>
        </div>

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Lovely Insults. All rights reserved.
        </footer>
      </div>
    </main>
  )
}

// Wrap in Suspense boundary
export function CategoryPageContent({ categorySlug }: { categorySlug: string }) {
  return (
    <Suspense fallback={<CategoryPageFallback categorySlug={categorySlug} />}>
      <CategoryPageContentInner categorySlug={categorySlug} />
    </Suspense>
  )
}

// Simple fallback for the Suspense boundary
function CategoryPageFallback({ categorySlug }: { categorySlug: string }) {
  const categoryName =
    decodeURIComponent(categorySlug).charAt(0).toUpperCase() + decodeURIComponent(categorySlug).slice(1)

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white dark:bg-gray-900">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 font-title">
            Lovely Insults
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading category...</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 w-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
