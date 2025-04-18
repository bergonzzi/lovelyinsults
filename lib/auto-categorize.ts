import type { Quote } from "@/lib/quotes"

// Keywords associated with different categories
const categoryKeywords: Record<string, string[]> = {
  // Intelligence - mental capacity, education, thinking
  Intelligence: [
    "stupid",
    "dumb",
    "idiot",
    "brain",
    "smart",
    "intelligent",
    "iq",
    "think",
    "thought",
    "genius",
    "educated",
    "schooling",
    "understand",
    "comprehend",
    "explain",
    "obvious",
    "bright",
    "mind",
    "capacity",
  ],

  // Appearance - physical looks
  Appearance: [
    "face",
    "ugly",
    "pretty",
    "look",
    "appearance",
    "makeup",
    "beautiful",
    "hideous",
    "physical",
    "beauty",
    "attractive",
  ],

  // Personality - character traits
  Personality: [
    "personality",
    "character",
    "yourself",
    "person",
    "attitude",
    "behavior",
    "ego",
    "self",
    "pride",
    "arrogant",
    "humble",
  ],

  // Social - relationships and interactions
  Social: [
    "people",
    "friends",
    "social",
    "relationship",
    "strangers",
    "meet",
    "talk",
    "conversation",
    "interact",
    "society",
    "group",
    "together",
    "alone",
    "tolerate",
  ],

  // Dismissive - rejection and dismissal
  Dismissive: ["ignore", "dismiss", "reject", "avoid", "waste", "bother", "care", "attention", "listen", "interest"],

  // Linguistic - wordplay and verbal techniques
  Linguistic: [
    "word",
    "speak",
    "talk",
    "say",
    "said",
    "tell",
    "told",
    "language",
    "verbal",
    "sarcastic",
    "sarcasm",
    "witty",
    "clever",
    "joke",
  ],

  // Comparison - analogies and comparisons
  Comparison: [
    "like",
    "as",
    "than",
    "equivalent",
    "remind",
    "similar",
    "compare",
    "contrast",
    "metaphor",
    "analogy",
    "resemble",
  ],

  // Backhanded - subtle insults as compliments
  Backhanded: [
    "good",
    "nice",
    "great",
    "wonderful",
    "excellent",
    "best",
    "better",
    "improve",
    "proud",
    "congratulations",
    "achievement",
    "accomplish",
  ],

  // Curse - wishes of misfortune
  Curse: [
    "hope",
    "may",
    "wish",
    "always",
    "never",
    "forever",
    "curse",
    "misfortune",
    "bad luck",
    "suffer",
    "pain",
    "inconvenience",
  ],

  // Conditional - hypothetical scenarios
  Conditional: [
    "if",
    "would",
    "could",
    "might",
    "may",
    "perhaps",
    "possibly",
    "hypothetical",
    "imagine",
    "scenario",
    "situation",
  ],

  // Advice - mock advice and guidance
  Advice: [
    "should",
    "need to",
    "try",
    "consider",
    "might want to",
    "advice",
    "suggest",
    "recommend",
    "guidance",
    "help",
    "assist",
  ],

  // Workplace - professional and business
  Workplace: [
    "work",
    "job",
    "office",
    "professional",
    "career",
    "business",
    "corporate",
    "company",
    "boss",
    "employee",
    "coworker",
    "colleague",
  ],

  // Everyday - common objects and activities
  Everyday: [
    "food",
    "eat",
    "drink",
    "bathroom",
    "shower",
    "clothes",
    "wear",
    "daily",
    "routine",
    "common",
    "regular",
    "ordinary",
    "mundane",
  ],
}

// Special categories that need more complex detection
const specialCategories: Record<string, (text: string) => boolean> = {
  Subtle: (text) => {
    // Subtle insults often don't contain obvious negative words
    const negativeWords = ["stupid", "idiot", "ugly", "hate", "dumb", "fool"]
    return !negativeWords.some((word) => text.toLowerCase().includes(word)) && text.length < 60 // Subtle insults tend to be shorter
  },

  Linguistic: (text) => {
    // Linguistic insults often have wordplay or unexpected turns
    return text.includes(",") || text.includes(";") || (text.includes(" but ") && text.length > 50)
  },

  Question: (text) => {
    // Check if it's a rhetorical question
    return text.includes("?")
  },
}

// Function to automatically categorize a quote based on its text
export function autoCategorizeQuote(quote: Quote): string[] {
  const text = quote.text.toLowerCase()
  const categories = new Set<string>()

  // Check for keywords
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      categories.add(category)
    }
  }

  // Check for special categories
  for (const [category, detector] of Object.entries(specialCategories)) {
    if (detector(quote.text)) {
      categories.add(category)
    }
  }

  // Add secondary categories based on structure and content
  if (text.includes("hope") || text.includes("may") || text.startsWith("may")) {
    categories.add("Curse")
  }

  if (text.includes("like") || text.includes(" as ")) {
    categories.add("Comparison")
  }

  // Map older categories to new consolidated ones
  const categoryMapping: Record<string, string> = {
    Educational: "Intelligence",
    Thought: "Intelligence",
    Awareness: "Intelligence",
    Physical: "Appearance",
    Beauty: "Appearance",
    Character: "Personality",
    Attitude: "Personality",
    Behavior: "Personality",
    Ego: "Personality",
    Relationship: "Social",
    Conversation: "Social",
    Tolerance: "Social",
    Presence: "Social",
    Absence: "Social",
    Avoidance: "Dismissive",
    Rejection: "Dismissive",
    Wordplay: "Linguistic",
    Witty: "Linguistic",
    Sarcastic: "Linguistic",
    Contrast: "Comparison",
    Metaphor: "Comparison",
    Simile: "Comparison",
    Expectation: "Backhanded",
    Disappointment: "Backhanded",
    Wish: "Curse",
    Hope: "Curse",
    Hypothetical: "Conditional",
    Guidance: "Advice",
    Suggestion: "Advice",
    Recommendation: "Advice",
    Professional: "Workplace",
    Career: "Workplace",
    Business: "Workplace",
    Bureaucracy: "Workplace",
    Food: "Everyday",
    Bathroom: "Everyday",
    Clothing: "Everyday",
  }

  // Convert old categories to new consolidated ones
  const consolidatedCategories = new Set<string>()
  categories.forEach((category) => {
    consolidatedCategories.add(categoryMapping[category] || category)
  })

  // Ensure we have at least two categories
  if (consolidatedCategories.size === 0) {
    consolidatedCategories.add("Dismissive")
    consolidatedCategories.add("Linguistic")
  } else if (consolidatedCategories.size === 1) {
    // Add a general secondary category based on the primary
    const primary = Array.from(consolidatedCategories)[0]
    if (primary === "Intelligence" || primary === "Appearance" || primary === "Personality") {
      consolidatedCategories.add("Dismissive")
    } else if (primary === "Social" || primary === "Workplace") {
      consolidatedCategories.add("Backhanded")
    } else if (primary === "Curse" || primary === "Conditional") {
      consolidatedCategories.add("Linguistic")
    } else {
      consolidatedCategories.add("Dismissive")
    }
  }

  return Array.from(consolidatedCategories).slice(0, 3) // Limit to 3 categories max
}
