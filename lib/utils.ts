import type React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add a utility function to help with adding new quotes
export function formatNewQuoteForJson(text: string, slug: string, categories?: string[]): string {
  return JSON.stringify({ text, slug, categories }, null, 2)
}

// Highlight search terms in text
export function highlightText(text: string, searchTerm: string): React.ReactNode {
  if (!searchTerm || !text) return text

  // Escape special characters in the search term for regex
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

  // Create a regex that matches the search term (case insensitive)
  const regex = new RegExp(`(${escapedSearchTerm})`, "gi")

  // Split the text by the regex
  const parts = text.split(regex)

  // Map the parts to either plain text or highlighted spans
  return parts.map((part, i) => {
    // Check if this part matches the search term (case insensitive)
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return (
        <span key={i} className="bg-yellow-100 dark:bg-yellow-900/50 text-black dark:text-yellow-100 px-0.5 rounded">
          {part}
        </span>
      )
    }
    return part
  })
}
