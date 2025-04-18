"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateSlug, addQuote } from "@/lib/quotes"
import { formatNewQuoteForJson } from "@/lib/utils"
import { ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function AddQuotePage() {
  const [quoteText, setQuoteText] = useState("")
  const [generatedSlug, setGeneratedSlug] = useState("")
  const [jsonOutput, setJsonOutput] = useState("")
  const [copied, setCopied] = useState(false)

  // Generate slug when quote text changes
  const handleQuoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setQuoteText(text)
    if (text) {
      setGeneratedSlug(generateSlug(text))
    } else {
      setGeneratedSlug("")
    }
  }

  // Generate JSON for the new quote
  const generateJson = () => {
    if (!quoteText || !generatedSlug) return

    const newQuote = addQuote(quoteText)
    setJsonOutput(formatNewQuoteForJson(newQuote.text, newQuote.slug))
  }

  // Copy JSON to clipboard
  const copyToClipboard = () => {
    if (!jsonOutput) return

    navigator.clipboard.writeText(jsonOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-md w-full space-y-8 py-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 font-title">
              Lovely Insults
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Admin - Add New Quote</p>
        </div>

        <div className="flex justify-start">
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">Add New Quote</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Create a new witty insult to add to the collection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quote" className="text-gray-700 dark:text-gray-300">
                Quote Text
              </Label>
              <Textarea
                id="quote"
                placeholder="Enter your witty insult here..."
                value={quoteText}
                onChange={handleQuoteChange}
                className="min-h-[100px] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-gray-700 dark:text-gray-300">
                Generated Slug
              </Label>
              <Input
                id="slug"
                value={generatedSlug}
                readOnly
                className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">This slug will be used in the URL</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4">
            <Button
              onClick={generateJson}
              disabled={!quoteText}
              className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Generate JSON
            </Button>

            {jsonOutput && (
              <div className="space-y-2 w-full">
                <Label htmlFor="json" className="text-gray-700 dark:text-gray-300">
                  JSON Output
                </Label>
                <div className="relative">
                  <Textarea
                    id="json"
                    value={jsonOutput}
                    readOnly
                    className="pr-10 bg-gray-50 dark:bg-gray-700 font-mono text-sm min-h-[100px] text-gray-800 dark:text-gray-100"
                  />
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Copy this JSON and add it to your quotes.json file
                </p>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
