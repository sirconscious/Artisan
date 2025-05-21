"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryPillsProps {
  categories: {
    name: string
    icon: string
  }[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function CategoryPills({ categories, selectedCategory, onSelectCategory }: CategoryPillsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = 200
      if (direction === "left") {
        current.scrollLeft -= scrollAmount
      } else {
        current.scrollLeft += scrollAmount
      }
    }
  }

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm h-8 w-8"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Scroll left</span>
        </Button>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto py-2 px-1 space-x-2 no-scrollbar scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className={`flex-shrink-0 rounded-full border-blue-200 ${
              selectedCategory === category.name
                ? "bg-blue-100 text-blue-800 border-blue-300"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            <span className="mr-1.5">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm h-8 w-8"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}
