"use client"
import { Button } from "@/components/ui/button"
import { getAllCategories } from "@/lib/quotes"

interface CategoryFilterProps {
  onSelectCategory: (category: string | null) => void
  selectedCategory: string | null
}

export function CategoryFilter({ onSelectCategory, selectedCategory }: CategoryFilterProps) {
  const categories = getAllCategories()

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectCategory(null)}
        className="text-xs"
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className="text-xs"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
