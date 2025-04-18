import { cn } from "@/lib/utils"
import Link from "next/link"
import { Tag } from "lucide-react"

interface CategoryBadgeProps {
  category: string
  clickable?: boolean
  className?: string
  variant?: "default" | "discreet"
}

// Color mapping for categories based on semantic grouping
const categoryColors: Record<string, { base: string; hover: string }> = {
  // Intelligence (Blue) - mental capacity, education, thinking
  Intelligence: {
    base: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    hover: "hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-800/40 dark:hover:text-blue-200",
  },
  Educational: {
    base: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    hover: "hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-800/40 dark:hover:text-blue-200",
  },
  Thought: {
    base: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    hover: "hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-800/40 dark:hover:text-blue-200",
  },
  Awareness: {
    base: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    hover: "hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-800/40 dark:hover:text-blue-200",
  },
  Observation: {
    base: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    hover: "hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-800/40 dark:hover:text-blue-200",
  },

  // Appearance (Pink) - physical looks
  Appearance: {
    base: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    hover: "hover:bg-pink-100 hover:text-pink-800 dark:hover:bg-pink-800/40 dark:hover:text-pink-200",
  },
  Physical: {
    base: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    hover: "hover:bg-pink-100 hover:text-pink-800 dark:hover:bg-pink-800/40 dark:hover:text-pink-200",
  },
  Beauty: {
    base: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    hover: "hover:bg-pink-100 hover:text-pink-800 dark:hover:bg-pink-800/40 dark:hover:text-pink-200",
  },

  // Personality (Purple) - character traits
  Personality: {
    base: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    hover: "hover:bg-purple-100 hover:text-purple-800 dark:hover:bg-purple-800/40 dark:hover:text-purple-200",
  },
  Character: {
    base: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    hover: "hover:bg-purple-100 hover:text-purple-800 dark:hover:bg-purple-800/40 dark:hover:text-purple-200",
  },
  Attitude: {
    base: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    hover: "hover:bg-purple-100 hover:text-purple-800 dark:hover:bg-purple-800/40 dark:hover:text-purple-200",
  },
  Behavior: {
    base: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    hover: "hover:bg-purple-100 hover:text-purple-800 dark:hover:bg-purple-800/40 dark:hover:text-purple-200",
  },
  Ego: {
    base: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    hover: "hover:bg-purple-100 hover:text-purple-800 dark:hover:bg-purple-800/40 dark:hover:text-purple-200",
  },

  // Social (Indigo) - relationships and interactions
  Social: {
    base: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    hover: "hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-800/40 dark:hover:text-indigo-200",
  },
  Relationship: {
    base: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    hover: "hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-800/40 dark:hover:text-indigo-200",
  },
  Conversation: {
    base: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    hover: "hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-800/40 dark:hover:text-indigo-200",
  },
  Tolerance: {
    base: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    hover: "hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-800/40 dark:hover:text-indigo-200",
  },
  Presence: {
    base: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    hover: "hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-800/40 dark:hover:text-indigo-200",
  },
  Absence: {
    base: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    hover: "hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-800/40 dark:hover:text-indigo-200",
  },

  // Dismissive (Red) - rejection and dismissal
  Dismissive: {
    base: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    hover: "hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800/40 dark:hover:text-red-200",
  },
  Avoidance: {
    base: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    hover: "hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800/40 dark:hover:text-red-200",
  },
  Rejection: {
    base: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    hover: "hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800/40 dark:hover:text-red-200",
  },
  Direct: {
    base: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    hover: "hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800/40 dark:hover:text-red-200",
  },

  // Linguistic (Cyan) - wordplay and verbal techniques
  Linguistic: {
    base: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    hover: "hover:bg-cyan-100 hover:text-cyan-800 dark:hover:bg-cyan-800/40 dark:hover:text-cyan-200",
  },
  Wordplay: {
    base: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    hover: "hover:bg-cyan-100 hover:text-cyan-800 dark:hover:bg-cyan-800/40 dark:hover:text-cyan-200",
  },
  Witty: {
    base: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    hover: "hover:bg-cyan-100 hover:text-cyan-800 dark:hover:bg-cyan-800/40 dark:hover:text-cyan-200",
  },
  Sarcastic: {
    base: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    hover: "hover:bg-cyan-100 hover:text-cyan-800 dark:hover:bg-cyan-800/40 dark:hover:text-cyan-200",
  },

  // Comparison (Amber) - analogies and comparisons
  Comparison: {
    base: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    hover: "hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-800/40 dark:hover:text-amber-200",
  },
  Contrast: {
    base: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    hover: "hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-800/40 dark:hover:text-amber-200",
  },
  Metaphor: {
    base: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    hover: "hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-800/40 dark:hover:text-amber-200",
  },
  Simile: {
    base: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    hover: "hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-800/40 dark:hover:text-amber-200",
  },

  // Backhanded (Teal) - subtle insults as compliments
  Backhanded: {
    base: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    hover: "hover:bg-teal-100 hover:text-teal-800 dark:hover:bg-teal-800/40 dark:hover:text-teal-200",
  },
  Subtle: {
    base: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    hover: "hover:bg-teal-100 hover:text-teal-800 dark:hover:bg-teal-800/40 dark:hover:text-teal-200",
  },
  Expectation: {
    base: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    hover: "hover:bg-teal-100 hover:text-teal-800 dark:hover:bg-teal-800/40 dark:hover:text-teal-200",
  },
  Disappointment: {
    base: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    hover: "hover:bg-teal-100 hover:text-teal-800 dark:hover:bg-teal-800/40 dark:hover:text-teal-200",
  },

  // Curse (Orange) - wishes of misfortune
  Curse: {
    base: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    hover: "hover:bg-orange-100 hover:text-orange-800 dark:hover:bg-orange-800/40 dark:hover:text-orange-200",
  },
  Wish: {
    base: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    hover: "hover:bg-orange-100 hover:text-orange-800 dark:hover:bg-orange-800/40 dark:hover:text-orange-200",
  },
  Hope: {
    base: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    hover: "hover:bg-orange-100 hover:text-orange-800 dark:hover:bg-orange-800/40 dark:hover:text-orange-200",
  },

  // Conditional (Violet) - hypothetical scenarios
  Conditional: {
    base: "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    hover: "hover:bg-violet-100 hover:text-violet-800 dark:hover:bg-violet-800/40 dark:hover:text-violet-200",
  },
  Hypothetical: {
    base: "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    hover: "hover:bg-violet-100 hover:text-violet-800 dark:hover:bg-violet-800/40 dark:hover:text-violet-200",
  },
  Question: {
    base: "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    hover: "hover:bg-violet-100 hover:text-violet-800 dark:hover:bg-violet-800/40 dark:hover:text-violet-200",
  },

  // Advice (Green) - mock advice and guidance
  Advice: {
    base: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    hover: "hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-800/40 dark:hover:text-green-200",
  },
  Guidance: {
    base: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    hover: "hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-800/40 dark:hover:text-green-200",
  },
  Suggestion: {
    base: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    hover: "hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-800/40 dark:hover:text-green-200",
  },

  // Workplace (Gray) - professional and business
  Workplace: {
    base: "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
    hover: "hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800/40 dark:hover:text-gray-200",
  },
  Professional: {
    base: "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
    hover: "hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800/40 dark:hover:text-gray-200",
  },
  Career: {
    base: "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
    hover: "hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800/40 dark:hover:text-gray-200",
  },
  Business: {
    base: "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
    hover: "hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800/40 dark:hover:text-gray-200",
  },
  Bureaucracy: {
    base: "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
    hover: "hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800/40 dark:hover:text-gray-200",
  },

  // Everyday (Yellow) - common objects and activities
  Everyday: {
    base: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    hover: "hover:bg-yellow-100 hover:text-yellow-800 dark:hover:bg-yellow-800/40 dark:hover:text-yellow-200",
  },
  Food: {
    base: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    hover: "hover:bg-yellow-100 hover:text-yellow-800 dark:hover:bg-yellow-800/40 dark:hover:text-yellow-200",
  },
  Bathroom: {
    base: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    hover: "hover:bg-yellow-100 hover:text-yellow-800 dark:hover:bg-yellow-800/40 dark:hover:text-yellow-200",
  },
  Clothing: {
    base: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    hover: "hover:bg-yellow-100 hover:text-yellow-800 dark:hover:bg-yellow-800/40 dark:hover:text-yellow-200",
  },
}

export function CategoryBadge({ category, clickable = true, className, variant = "default" }: CategoryBadgeProps) {
  // For discreet variant, use transparent background with subtle text
  if (variant === "discreet") {
    // Base classes for discreet variant
    const baseClasses = "inline-flex items-center text-xs font-medium transition-colors duration-150"

    // Discreet styling with subtle hover effect
    const discreetClasses = cn(
      baseClasses,
      className || "", // Apply custom classes first
      !className && "text-gray-400/80 dark:text-gray-500/80", // Only apply default text color if no custom class provided
      clickable ? "hover:text-gray-600 dark:hover:text-gray-300" : "",
    )

    const badge = (
      <span className={discreetClasses}>
        <Tag className="mr-1 h-3 w-3" />
        {category}
      </span>
    )

    if (clickable) {
      return (
        <Link
          href={`/category/${encodeURIComponent(category.toLowerCase())}?page=1`}
          className="no-underline hover:no-underline"
        >
          {badge}
        </Link>
      )
    }

    return badge
  }

  // Get color classes or use default gray if category not found
  const colorClasses = categoryColors[category] || {
    base: "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
    hover: "hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800/40 dark:hover:text-gray-200",
  }

  // Add transition for smooth hover effect
  const baseClasses = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium transition-colors duration-150"

  // Combine all classes
  const badgeClasses = cn(
    baseClasses,
    colorClasses.base,
    clickable ? colorClasses.hover : "", // Only add hover effect if clickable
    className,
  )

  const badge = <span className={badgeClasses}>{category}</span>

  if (clickable) {
    return (
      <Link
        href={`/category/${encodeURIComponent(category.toLowerCase())}?page=1`}
        className="no-underline hover:no-underline"
      >
        {badge}
      </Link>
    )
  }

  return badge
}
