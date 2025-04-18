"use client"

import Link from "next/link"
import { getAllCategories, getQuotesByCategory } from "@/lib/quotes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Grid3X3, Home, Search } from "lucide-react"

export default function BrowsePage() {
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
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Browse By Category</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Discover the perfect comeback for any situation, organized by category. We've curated{" "}
            {categoryCounts.reduce((sum, cat) => sum + cat.count, 0)} witty insults across {categories.length}{" "}
            categories.
          </p>
        </div>

        {/* All categories */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center mb-6">
            <Grid3X3 className="mr-2 h-5 w-5" />
            All Categories
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCounts.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="group block">
                <Card className="border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:border-gray-300 dark:hover:border-gray-600">
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
                  <CardContent className="pb-4">
                    {/* Show only one example insult */}
                    {category.sampleQuote && (
                      <div className="text-sm text-gray-600 dark:text-gray-300 italic line-clamp-2">
                        "{category.sampleQuote.text}"
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Related links */}
        <section className="flex justify-center space-x-6 text-sm">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:underline flex items-center">
            <Home className="mr-1.5 h-3.5 w-3.5" />
            Home
          </Link>
          <Link href="/search" className="text-gray-600 dark:text-gray-300 hover:underline flex items-center">
            <Search className="mr-1.5 h-3.5 w-3.5" />
            Search
          </Link>
        </section>

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Lovely Insults. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
