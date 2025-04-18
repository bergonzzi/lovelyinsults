import { getRandomQuote } from "@/lib/quotes"
import { QuoteDisplay } from "@/components/quote-display"

export const metadata = {
  title: "Lovely Insults - Witty Comebacks",
  description: "A collection of witty, non-swearing comebacks and insults.",
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
