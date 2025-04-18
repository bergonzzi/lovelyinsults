"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  initialQuery?: string
}

export function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [showMinLengthError, setShowMinLengthError] = useState(false)
  const router = useRouter()

  // Check for minimum length and update UI accordingly
  useEffect(() => {
    // If search term is empty, don't show error
    if (searchTerm.trim().length === 0) {
      setShowMinLengthError(false)
      return
    }

    // If search term is too short, show error
    if (searchTerm.trim().length < 2) {
      setShowMinLengthError(true)
      return
    }

    // If search term is valid, hide error
    setShowMinLengthError(false)
  }, [searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    } else if (searchTerm.trim().length > 0) {
      // Show error if search term is too short but not empty
      setShowMinLengthError(true)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    setShowMinLengthError(false)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative">
        <Input
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
  )
}
