import { getRandomQuote, getAllCategories } from "@/lib/quotes"
import { QuoteDisplay } from "@/components/quote-display"

export async function generateMetadata() {
  const categories = getAllCategories()
  const categoryText =
    categories.length > 0 ? `Browse insults by categories: ${categories.slice(0, 5).join(", ")} and more.` : ""

  return {
    title: "Lovely Insults - Witty Comebacks",
    description: `A collection of witty, non-swearing comebacks and insults. ${categoryText}`,
    keywords: ["insult", "comeback", "witty", "clever", ...categories.slice(0, 10)],
  }
}

export default function Home() {
  // Get a random quote for the homepage
  const randomQuote = getRandomQuote()

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <QuoteDisplay initialQuote={randomQuote} />
    </main>
  )
}
