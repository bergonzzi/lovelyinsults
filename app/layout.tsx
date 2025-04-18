import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Cormorant_Garamond } from "next/font/google"
import { Libre_Baskerville } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
  variable: "--font-cormorant",
})

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
})

export const metadata = {
  title: "Lovely Insults - Witty Comebacks",
  description: "A collection of witty, non-swearing comebacks and insults.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              // On page load or when changing themes, best to add inline in \`head\` to avoid FOUC
              if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            })()
          `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${libreBaskerville.variable} font-sans`}
      >
        {/* Google Analytics */}
        <GoogleAnalytics GA_MEASUREMENT_ID="G-LZVYWFNJXK" />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
