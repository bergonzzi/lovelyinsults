"use client"

import type React from "react"
import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { quotes, type Quote } from "@/lib/quotes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, ChevronLeft, ChevronRight, Home, Grid3X3, X } from "lucide-react"
import { CategoryBadge } from "@/components/category-badge"
import { highlightText } from "@/lib/utils"
import { trackSearch, trackSearchPagination, trackSearchRefinement } from "@/lib/analytics"

// Number of results per page
const RESULTS_PER_PAGE = 20

// Component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  const pageParam = searchParams.get("page") || "1"
  const currentPage = Number.parseInt(pageParam, 10) || 1

  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQuery.length >= 2 ? initialQuery : "")
  const [previousSearchTerm, setPreviousSearchTerm] = useState(initialQuery.length >= 2 ? initialQuery : "")
  const [results, setResults] = useState<Quote[]>([])
  const [filteredResults, setFilteredResults] = useState<Quote[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [previousPage, setPreviousPage] = useState(currentPage)
  const [showMinLengthError, setShowMinLengthError] = useState(false)

  // Focus the search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  // Immediately check if search term is too short and update UI accordingly
  useEffect(() => {
    // If search term is empty, don't show error
    if (searchTerm.trim().length === 0) {
      setShowMinLengthError(false)
      return
    }

    // If search term is too short, show error and clear results
    if (searchTerm.trim().length < 2) {
      setShowMinLengthError(true)
      setDebouncedSearchTerm("") // Clear results immediately

      // Update URL to remove query if it exists
      if (searchParams.has("q")) {
        router.replace("/search", { scroll: false })
      }
    } else {
      setShowMinLengthError(false)
    }
  }, [searchTerm, searchParams, router])

  // Debounce search term to avoid too many updates
  useEffect(() => {
    // Only debounce if we have at least 2 characters
    if (searchTerm.trim().length >= 2) {
      const timer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm.trim())
      }, 300) // 300ms delay

      return () => clearTimeout(timer)
    }
  }, [searchTerm])

  // Update URL when search term changes (but not on every keystroke)
  useEffect(() => {
    if (debouncedSearchTerm !== initialQuery) {
      const params = new URLSearchParams()
      if (debouncedSearchTerm) {
        params.set("q", debouncedSearchTerm)
        params.set("page", "1") // Reset to page 1 on new search
      }

      // Use replace instead of push to avoid adding to history stack on every keystroke
      router.replace(`/search${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false })
    }
  }, [debouncedSearchTerm, initialQuery, router])

  // Filter quotes based on search query
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true)
      const filteredQuotes = quotes.filter((quote) =>
        quote.text.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      )
      setResults(filteredQuotes)
      setTotalPages(Math.max(1, Math.ceil(filteredQuotes.length / RESULTS_PER_PAGE)))
      setIsLoading(false)

      // Track search analytics
      if (debouncedSearchTerm !== previousSearchTerm) {
        // Track the search event
        trackSearch(debouncedSearchTerm, filteredQuotes.length)

        // Track search refinement if this isn't the first search
        if (previousSearchTerm) {
          trackSearchRefinement(previousSearchTerm, debouncedSearchTerm)
        }

        // Update previous search term
        setPreviousSearchTerm(debouncedSearchTerm)
      }
    } else {
      setResults([])
      setTotalPages(1)
      setIsLoading(false)
    }
  }, [debouncedSearchTerm, previousSearchTerm])

  // Apply pagination to results
  useEffect(() => {
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
    const endIndex = startIndex + RESULTS_PER_PAGE
    setFilteredResults(results.slice(startIndex, endIndex))

    // Track pagination changes
    if (currentPage !== previousPage && debouncedSearchTerm) {
      trackSearchPagination(debouncedSearchTerm, previousPage, currentPage)
      setPreviousPage(currentPage)
    }
  }, [results, currentPage, debouncedSearchTerm, previousPage])

  // Navigate to a specific page
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/search?${params.toString()}`)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setShowMinLengthError(false)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Only proceed if search term has at least 2 characters
    if (searchTerm.trim().length >= 2) {
      const params = new URLSearchParams()
      params.set("q", searchTerm.trim())
      params.set("page", "1") // Reset to page 1 on explicit search
      router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`)
    } else if (searchTerm.trim().length > 0) {
      // Show error if search term is too short but not empty
      setShowMinLengthError(true)
    }
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
                  if (window.location.pathname.includes("/search")) {
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

        {/* Search form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Type at least 2 characters to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 bg-white dark:bg-gray-800"
            />
            {searchTerm ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                aria-label="Search"
                disabled={searchTerm.trim().length < 2}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Show error message if search term is too short */}
          {showMinLengthError && (
            <p className="text-sm text-red-500 dark:text-red-400 mt-1">Please enter at least 2 characters to search</p>
          )}
        </form>

        <div className="space-y-4">
          {debouncedSearchTerm ? (
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Results for "{debouncedSearchTerm}"
            </h2>
          ) : null}

          {isLoading ? (
            <p className="text-center py-8 text-gray-500 dark:text-gray-400">Loading results...</p>
          ) : debouncedSearchTerm && results.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map((quote, index) => (
                <div key={quote.slug} className="group">
                  <Card className="border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <Link
                        href={`/insult/${quote.slug}`}
                        className="block mb-2"
                        onClick={() => {
                          // Track when a user clicks on a search result
                          const position = (currentPage - 1) * RESULTS_PER_PAGE + index + 1
                          import("@/lib/analytics").then(({ trackSearchResultClick }) => {
                            trackSearchResultClick(debouncedSearchTerm, quote.slug, position)
                          })
                        }}
                      >
                        <p
                          className="text-gray-800 dark:text-gray-100 font-quote group-hover:underline"
                          dangerouslySetInnerHTML={{
                            __html: `"${highlightText(quote.text, debouncedSearchTerm)}"`,
                          }}
                        />
                      </Link>

                      {/* Categories */}
                      {quote.categories && quote.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {quote.categories.map((category) => (
                            <CategoryBadge key={category} category={category} variant="discreet" clickable={true} />
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Found {results.length} result{results.length !== 1 ? "s" : ""}
                {results.length > RESULTS_PER_PAGE &&
                  ` • Showing ${(currentPage - 1) * RESULTS_PER_PAGE + 1}-${Math.min(
                    currentPage * RESULTS_PER_PAGE,
                    results.length,
                  )}`}
              </p>

              {renderPagination()}
            </div>
          ) : debouncedSearchTerm ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No results found for "{debouncedSearchTerm}"</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Try a different search term or browse our collection
              </p>
              <Link href="/browse" className="mt-4 inline-block">
                <Button variant="outline" className="mt-4 border-gray-200 dark:border-gray-700">
                  Browse All Categories
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Enter a search term to find insults</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Or browse our collection by category</p>
              <Link href="/browse" className="mt-4 inline-block">
                <Button variant="outline" className="mt-4 border-gray-200 dark:border-gray-700">
                  Browse All Categories
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
        </div>

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Lovely Insults. All rights reserved.
        </footer>
      </div>
    </main>
  )
}

// Wrap in Suspense boundary
export default function SearchResultsPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  )
}

// Simple fallback for the Suspense boundary
function SearchFallback() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white dark:bg-gray-900">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 font-title">
            Lovely Insults
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading search...</p>
        </div>
        <div className="h-10 w-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 w-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          ))}
        </div>
      </div>
    </main>
  )
}
