"use client"

import Link from "next/link"
import { getAllCategories, getQuotesByCategory } from "@/lib/quotes"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CategoryBadge } from "@/components/category-badge"
import { ArrowRight, Grid3X3, Tag, TrendingUp, Home, Search } from "lucide-react"

export default function BrowsePageClient() {
  // Get all categories and count quotes in each
  const categories = getAllCategories()
  const categoryCounts = categories.map((category) => ({
    name: category,
    count: getQuotesByCategory(category).length,
    // Get 1 sample quote for preview
    sampleQuote: getQuotesByCategory(category)[0],
  }))

  // Sort categories by count (most popular first)
  categoryCounts.sort((a, b) => b.count - a.count)

  // Get top categories for featured section
  const topCategories = categoryCounts.slice(0, 4)

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 font-title">
              Lovely Insults
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Witty comebacks that don't cross the line</p>
        </div>

        {/* Hero section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Browse Our Collection</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Discover the perfect comeback for any situation, organized by category. We've curated{" "}
            {categoryCounts.reduce((sum, cat) => sum + cat.count, 0)} witty insults across {categories.length}{" "}
            categories.
          </p>
        </div>

        {/* Featured categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Popular Categories
            </h3>
            <Link href="#all-categories">
              <Button variant="ghost" size="sm" className="text-sm">
                View all categories
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="group">
                <Card className="h-full border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.count} insult{category.count !== 1 ? "s" : ""}
                    </p>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 italic">
                      "{category.sampleQuote?.text}"
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    >
                      <span>Browse category</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* All categories */}
        <section id="all-categories">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center mb-6">
            <Grid3X3 className="mr-2 h-5 w-5" />
            All Categories
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCounts.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="group">
                <Card className="border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </CardTitle>
                      <div className="text-sm font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {category.count}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Show only one example insult */}
                    {category.sampleQuote && (
                      <div className="text-sm text-gray-600 dark:text-gray-300 italic line-clamp-2">
                        "{category.sampleQuote.text}"
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    >
                      <span>View all</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Category cloud */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center mb-6">
            <Tag className="mr-2 h-5 w-5" />
            Category Cloud
          </h3>

          <div className="flex flex-wrap gap-3 justify-center">
            {categoryCounts.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
                <div className="group">
                  <CategoryBadge
                    category={category.name}
                    className={`text-sm py-1.5 px-3 ${
                      category.count > 10 ? "scale-110" : category.count > 5 ? "scale-105" : "scale-100"
                    }`}
                  />
                  <span className="sr-only">{category.count} insults</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related links - updated with icons and removed Add Quote */}
        <section className="flex justify-center space-x-6 text-sm">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:underline flex items-center">
            <Home className="mr-1.5 h-3.5 w-3.5" />
            Home
          </Link>
          <button
            onClick={() => {
              // This will be handled by client component
              const event = new CustomEvent("openSearchModal")
              window.dispatchEvent(event)
            }}
            className="text-gray-600 dark:text-gray-300 hover:underline flex items-center bg-transparent border-0 p-0 cursor-pointer font-sans text-sm"
          >
            <Search className="mr-1.5 h-3.5 w-3.5" />
            Search
          </button>
        </section>

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Lovely Insults. All rights reserved.
        </footer>
      </div>
    </main>
  )
}

// This file is not being used anymore, so we don't need to fix it
// The active file is app/browse/client-page.tsx which we already fixed
