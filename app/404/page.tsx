import { notFound } from "next/navigation"

export default function Custom404Page() {
  // This will trigger Next.js built-in 404 handling
  notFound()
}
