import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 font-title">
              Lovely Insults
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Witty comebacks that don't cross the line</p>
        </div>

        <Card className="border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
          <CardContent className="pt-8 pb-10 px-8">
            <div className="relative px-6 py-8">
              <div className="relative">
                <blockquote className="text-4xl text-center font-medium relative text-gray-800 dark:text-gray-100 font-quote">
                  <span className="absolute -left-3 -top-8 text-6xl font-quote-marks leading-none text-gray-300 dark:text-gray-600">
                    "
                  </span>
                  404: The page is missing. Much like your sense of direction.
                  <span className="absolute -right-3 -bottom-8 text-6xl font-quote-marks leading-none text-gray-300 dark:text-gray-600">
                    "
                  </span>
                </blockquote>
              </div>
            </div>

            <div className="flex justify-center items-center mt-10">
              <Link href="/" passHref>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-all"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Give me another one
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center items-center space-x-6 text-sm">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:underline">
            Back to home
          </Link>
        </div>

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Lovely Insults. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
