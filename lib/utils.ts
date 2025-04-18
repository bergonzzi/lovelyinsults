import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add a utility function to help with adding new quotes
export function formatNewQuoteForJson(text: string, slug: string, categories?: string[]): string {
  return JSON.stringify({ text, slug, categories }, null, 2)
}

// Highlight search terms in text - returns HTML string instead of JSX
export function highlightText(text: string, searchTerm: string): string {
  if (!searchTerm || !text) return text

  // Escape special characters in the search term for regex
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

  // Create a regex that matches the search term (case insensitive)
  const regex = new RegExp(`(${escapedSearchTerm})`, "gi")

  // Replace matches with highlighted HTML
  return text.replace(
    regex,
    '<span class="bg-yellow-100 dark:bg-yellow-900/50 text-black dark:text-yellow-100 px-0.5 rounded">$1</span>',
  )
}
