"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Twitter, Facebook, Linkedin, Copy, Check, Link2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ShareProps {
  quote: string
  slug: string
  isLink?: boolean
}

export function Share({ quote, slug, isLink = false }: ShareProps) {
  const [copied, setCopied] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [url, setUrl] = useState("")

  // Set up the full URL when component mounts
  useEffect(() => {
    // Get the base URL from environment variable or use a default
    let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lovelyinsults.com"

    // Ensure the URL uses HTTPS
    if (baseUrl.startsWith("http://")) {
      baseUrl = baseUrl.replace("http://", "https://")
    } else if (!baseUrl.startsWith("https://")) {
      baseUrl = "https://" + baseUrl
    }

    setUrl(`${baseUrl}/insult/${slug}`)
  }, [slug])

  // Track share events in Google Analytics
  const trackShare = (platform: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "share", {
        method: platform,
        content_type: "insult",
        item_id: slug,
      })
    }
  }

  // Copy to clipboard with URL
  const copyToClipboard = () => {
    const textToCopy = `"${quote}" - Lovely Insults\n${url}`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackShare("copy")
  }

  // Copy just the URL to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
    trackShare("copy_link")
  }

  // Share on social media with URL
  const shareOnTwitter = () => {
    const tweetText = `"${quote}" - Lovely Insults`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
    trackShare("twitter")
  }

  const shareOnFacebook = () => {
    // Facebook doesn't reliably use the quote parameter, so we'll use a different approach
    // We'll open the sharer with just the URL, and Facebook will scrape the page metadata
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "width=600,height=400",
    )
    trackShare("facebook")
  }

  const shareOnLinkedIn = () => {
    // LinkedIn doesn't reliably use the summary parameter for the post content
    // We'll use the title parameter to include the quote
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "width=600,height=400",
    )
    trackShare("linkedin")
  }

  const shareOnWhatsApp = () => {
    const text = `"${quote}" - Lovely Insults\n${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
    trackShare("whatsapp")
  }

  if (isLink) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="text-gray-600 dark:text-gray-300 hover:underline cursor-pointer flex items-center">
            <Share2 className="mr-1.5 h-3.5 w-3.5" />
            Share
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={copyLinkToClipboard}>
            {copiedLink ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Link copied!
              </>
            ) : (
              <>
                <Link2 className="mr-2 h-4 w-4" />
                Copy link
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnTwitter}>
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnFacebook}>
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnLinkedIn}>
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnWhatsApp}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4c-4.88 0-8.86 3.97-8.86 8.84 0 1.56.41 3.09 1.18 4.43l-1.26 4.59 4.7-1.23a8.9 8.9 0 0 0 4.24 1.08h.004c4.88 0 8.86-3.97 8.86-8.84 0-2.36-.92-4.58-2.6-6.25zm-5.55 13.57h-.003a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.8.73.75-2.72-.18-.28a7.35 7.35 0 0 1-1.13-3.95c0-4.06 3.3-7.35 7.37-7.35 1.97 0 3.82.77 5.21 2.16a7.34 7.34 0 0 1 2.16 5.22c0 4.06-3.3 7.38-7.37 7.38zm4.04-5.53c-.22-.11-1.32-.65-1.52-.72s-.35-.11-.5.11c-.15.22-.58.72-.7.87-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.8-1.1-.66-.6-1.11-1.33-1.24-1.55-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.4.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.4-.06-.11-.5-1.2-.68-1.65-.18-.43-.37-.37-.5-.38-.13 0-.28-.01-.43-.01-.15 0-.39.06-.6.28-.2.22-.78.77-.78 1.87 0 1.1.8 2.17.91 2.32.11.15 1.6 2.44 3.87 3.43.54.23.96.37 1.3.48.54.17 1.03.15 1.42.09.43-.06 1.32-.54 1.51-1.07.19-.52.19-.97.13-1.07-.06-.09-.21-.15-.43-.26z" />
            </svg>
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy text
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-all"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={copyLinkToClipboard}>
          {copiedLink ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Link copied!
            </>
          ) : (
            <>
              <Link2 className="mr-2 h-4 w-4" />
              Copy link
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnTwitter}>
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnFacebook}>
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnLinkedIn}>
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnWhatsApp}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4c-4.88 0-8.86 3.97-8.86 8.84 0 1.56.41 3.09 1.18 4.43l-1.26 4.59 4.7-1.23a8.9 8.9 0 0 0 4.24 1.08h.004c4.88 0 8.86-3.97 8.86-8.84 0-2.36-.92-4.58-2.6-6.25zm-5.55 13.57h-.003a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.8.73.75-2.72-.18-.28a7.35 7.35 0 0 1-1.13-3.95c0-4.06 3.3-7.35 7.37-7.35 1.97 0 3.82.77 5.21 2.16a7.34 7.34 0 0 1 2.16 5.22c0 4.06-3.3 7.38-7.37 7.38zm4.04-5.53c-.22-.11-1.32-.65-1.52-.72s-.35-.11-.5.11c-.15.22-.58.72-.7.87-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.8-1.1-.66-.6-1.11-1.33-1.24-1.55-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.4.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.4-.06-.11-.5-1.2-.68-1.65-.18-.43-.37-.37-.5-.38-.13 0-.28-.01-.43-.01-.15 0-.39.06-.6.28-.2.22-.78.77-.78 1.87 0 1.1.8 2.17.91 2.32.11.15 1.6 2.44 3.87 3.43.54.23.96.37 1.3.48.54.17 1.03.15 1.42.09.43-.06 1.32-.54 1.51-1.07.19-.52.19-.97.13-1.07-.06-.09-.21-.15-.43-.26z" />
          </svg>
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy text
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
