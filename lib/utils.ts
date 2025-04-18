import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add a utility function to help with adding new quotes
export function formatNewQuoteForJson(text: string, slug: string): string {
  return JSON.stringify({ text, slug }, null, 2)
}
