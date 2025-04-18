import { Skeleton } from "@/components/ui/skeleton"

export default function BrowseLoading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto mt-2" />
        </div>

        {/* Hero section */}
        <div className="text-center max-w-3xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-full mx-auto mb-2" />
          <Skeleton className="h-4 w-full mx-auto mb-2" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        {/* Featured categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        </section>

        {/* All categories */}
        <section>
          <Skeleton className="h-8 w-48 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        </section>

        {/* Category cloud */}
        <section>
          <Skeleton className="h-8 w-48 mb-6" />

          <div className="flex flex-wrap gap-3 justify-center">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
