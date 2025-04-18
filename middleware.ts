import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Skip for static files, api routes, and known routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/" ||
    pathname === "/browse" || // Add the browse route here
    pathname === "/admin/add-quote" ||
    pathname === "/search" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next()
  }

  // Handle quote routes
  if (pathname.startsWith("/insult/")) {
    // Skip the actual dynamic route
    if (pathname === "/insult/[slug]") {
      return NextResponse.next()
    }

    // Get the slug from the URL
    const slug = pathname.replace("/insult/", "")

    // If the slug doesn't match our pattern, redirect to 404
    if (!/^[a-z0-9-]+$/.test(slug)) {
      url.pathname = "/not-found"
      return NextResponse.rewrite(url)
    }

    // Let Next.js handle valid-looking slugs (it will show 404 if not found)
    return NextResponse.next()
  }

  // Handle category routes
  if (pathname.startsWith("/category/")) {
    // Skip the actual dynamic route
    if (pathname === "/category/[category]") {
      return NextResponse.next()
    }

    // Get the category from the URL
    const category = pathname.replace("/category/", "")

    // If the category doesn't match our pattern, redirect to 404
    if (!/^[a-z0-9-]+$/.test(category)) {
      url.pathname = "/not-found"
      return NextResponse.rewrite(url)
    }

    // Let Next.js handle valid-looking categories
    return NextResponse.next()
  }

  // Handle legacy /quote/ URLs and redirect to /insult/
  if (pathname.startsWith("/quote/")) {
    const slug = pathname.replace("/quote/", "")
    url.pathname = `/insult/${slug}`
    return NextResponse.redirect(url)
  }

  // For any other unhandled routes, show 404
  // This catches routes like /123 or /anything-not-defined
  url.pathname = "/not-found"
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and known routes
    "/((?!_next/|api/|favicon.ico).*)",
  ],
}
