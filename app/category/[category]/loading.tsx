export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 p-4 bg-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 font-title">
            Lovely Insults
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Witty comebacks that don't cross the line</p>
        </div>

        <div className="h-10 w-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>

        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 w-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            ))}
          </div>

          {/* Loading state for pagination */}
          <div className="flex justify-center mt-6">
            <div className="h-8 w-32 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </div>
    </main>
  )
}
