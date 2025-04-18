import quotesData from "@/data/quotes.json"

// Define the quote type
export interface Quote {
  text: string
  slug: string
}

// Function to generate a slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .substring(0, 60) // Limit length
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

// Load quotes from JSON file
export const quotes: Quote[] = quotesData

// Get a random quote
export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
}

// Get a quote by slug
export function getQuoteBySlug(slug: string): Quote | undefined {
  return quotes.find((quote) => quote.slug === slug)
}

// Get all quote slugs for static paths
export function getAllQuoteSlugs(): string[] {
  return quotes.map((quote) => quote.slug)
}

// Get next and previous quote slugs
export function getAdjacentQuoteSlugs(currentSlug: string): { prevSlug: string | null; nextSlug: string | null } {
  const currentIndex = quotes.findIndex((quote) => quote.slug === currentSlug)

  if (currentIndex === -1) {
    return { prevSlug: null, nextSlug: null }
  }

  const prevSlug = currentIndex > 0 ? quotes[currentIndex - 1].slug : null
  const nextSlug = currentIndex < quotes.length - 1 ? quotes[currentIndex + 1].slug : null

  return { prevSlug, nextSlug }
}

// Helper function to add a new quote
export function addQuote(text: string): Quote {
  const slug = generateSlug(text)
  return { text, slug }
}
