"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

export default function NotFound() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check for dark mode preference
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDarkMode(e.matches)
    }

    // Set initial value
    updateTheme(darkModeMediaQuery)

    // Listen for changes
    darkModeMediaQuery.addEventListener("change", updateTheme)

    return () => {
      darkModeMediaQuery.removeEventListener("change", updateTheme)
    }
  }, [])

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start pt-16 p-4 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-white to-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1
              className={`text-4xl font-extrabold tracking-tight font-title ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Lovely Insults
            </h1>
          </Link>
          <p className={isDarkMode ? "mt-2 text-sm text-gray-400" : "mt-2 text-sm text-gray-500"}>
            Witty comebacks that don't cross the line
          </p>
        </div>

        <Card className={isDarkMode ? "border-gray-700 shadow-md bg-gray-800" : "border-gray-200 shadow-md bg-white"}>
          <CardContent className="pt-8 pb-10 px-8">
            <div className="relative px-6 py-8">
              <div className="relative">
                <blockquote
                  className={`text-4xl text-center font-medium relative ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  } font-quote`}
                >
                  <span
                    className={`absolute -left-3 -top-8 text-6xl font-quote-marks leading-none ${
                      isDarkMode ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    "
                  </span>
                  404: The page is missing. Much like your sense of direction.
                  <span
                    className={`absolute -right-3 -bottom-8 text-6xl font-quote-marks leading-none ${
                      isDarkMode ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    "
                  </span>
                </blockquote>
              </div>
            </div>

            <div className="flex justify-center items-center mt-10">
              <Link href="/" passHref>
                <Button
                  variant="outline"
                  className={
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-700 hover:text-gray-300 transition-all"
                      : "border-gray-200 hover:bg-gray-50 hover:text-gray-700 transition-all"
                  }
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Give me another one
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center items-center space-x-6 text-sm">
          <Link href="/" className={isDarkMode ? "text-gray-300 hover:underline" : "text-gray-600 hover:underline"}>
            Back to home
          </Link>
        </div>

        <footer className={isDarkMode ? "text-center text-xs text-gray-400" : "text-center text-xs text-gray-500"}>
          © {new Date().getFullYear()} Lovely Insults. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
