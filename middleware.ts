import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip for static files, api routes, and known routes
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/" ||
    pathname === "/browse" ||
    pathname === "/admin/add-quote" ||
    pathname === "/search" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/insult/") ||
    pathname.startsWith("/category/")
  ) {
    return NextResponse.next()
  }

  // For any other unhandled routes, redirect to 404 page
  return NextResponse.redirect(new URL("/404", request.url))
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and known routes
    "/((?!_next/|api/|favicon.ico).*)",
  ],
}
