// Track search events in Google Analytics
export function trackSearch(searchTerm: string, resultsCount: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search", {
      search_term: searchTerm,
      results_count: resultsCount,
      // Additional parameters that might be useful
      category: "search",
      label: `${searchTerm} (${resultsCount} results)`,
    })
  }
}

// Track when a user clicks on a search result
export function trackSearchResultClick(searchTerm: string, resultSlug: string, position: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "select_content", {
      content_type: "search_result",
      content_id: resultSlug,
      search_term: searchTerm,
      position: position, // Position in the search results (1-based)
      category: "search",
      label: `${searchTerm} -> ${resultSlug}`,
    })
  }
}

// Track search refinements (when a user modifies their search)
export function trackSearchRefinement(previousTerm: string, newTerm: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search_refinement", {
      previous_term: previousTerm,
      new_term: newTerm,
      category: "search",
      label: `${previousTerm} -> ${newTerm}`,
    })
  }
}

// Track pagination in search results
export function trackSearchPagination(searchTerm: string, fromPage: number, toPage: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search_pagination", {
      search_term: searchTerm,
      from_page: fromPage,
      to_page: toPage,
      category: "search",
      label: `${searchTerm} (Page ${fromPage} -> ${toPage})`,
    })
  }
}
