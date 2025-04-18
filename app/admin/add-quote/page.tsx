"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateSlug, addQuote, getAllCategories } from "@/lib/quotes"
import { ArrowLeft, Copy, Check, Plus, X } from "lucide-react"
import Link from "next/link"
import { autoCategorizeQuote } from "@/lib/auto-categorize"

export default function AddQuotePage() {
  const [quoteText, setQuoteText] = useState("")
  const [generatedSlug, setGeneratedSlug] = useState("")
  const [jsonOutput, setJsonOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [existingCategories, setExistingCategories] = useState<string[]>([])

  // Load existing categories
  useEffect(() => {
    setExistingCategories(getAllCategories())
  }, [])

  // Generate slug when quote text changes
  const handleQuoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setQuoteText(text)
    if (text) {
      setGeneratedSlug(generateSlug(text))

      // Auto-suggest categories
      const dummyQuote = { text, slug: generateSlug(text) }
      const autoCategories = autoCategorizeQuote(dummyQuote)
      setSuggestedCategories(autoCategories)
    } else {
      setGeneratedSlug("")
      setSuggestedCategories([])
    }
  }

  // Add a category to selected categories
  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Remove a category from selected categories
  const removeCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category))
  }

  // Add a new custom category
  const handleAddNewCategory = () => {
    if (newCategory && !selectedCategories.includes(newCategory)) {
      setSelectedCategories([...selectedCategories, newCategory])
      setNewCategory("")
    }
  }

  // Generate JSON for the new quote
  const generateJson = () => {
    if (!quoteText || !generatedSlug) return

    const newQuote = addQuote(quoteText)

    // Add categories to the JSON output
    const quoteWithCategories = {
      ...newQuote,
      categories: selectedCategories.length > 0 ? selectedCategories : suggestedCategories,
    }

    setJsonOutput(JSON.stringify(quoteWithCategories, null, 2))
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

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Categories</Label>

              {/* Suggested categories */}
              {suggestedCategories.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => addCategory(category)}
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                          ${
                            selectedCategories.includes(category)
                              ? "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected categories */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Selected categories:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.length > 0 ? (
                    selectedCategories.map((category) => (
                      <div
                        key={category}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      >
                        {category}
                        <button
                          onClick={() => removeCategory(category)}
                          className="ml-1 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      No categories selected. Suggested categories will be used.
                    </p>
                  )}
                </div>
              </div>

              {/* Add custom category */}
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add custom category..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddNewCategory}
                  disabled={!newCategory}
                  className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Existing categories */}
              {existingCategories.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Existing categories:</p>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded">
                    {existingCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => addCategory(category)}
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                          ${
                            selectedCategories.includes(category)
                              ? "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
