"use client"

import { useState, useEffect } from "react"
import { ChevronDown, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface JobFiltersProps {
  categories: {
    name: string
    icon: string
  }[]
  filters: {
    categories: string[]
    location: string
    distance: number
    priceRange: number[]
    urgency: string[]
    datePosted: string
    jobType: string[]
    experienceLevel: string[]
  }
  setFilters: (filters: any) => void
  resetFilters: () => void
}

export function JobFilters({ categories, filters, setFilters, resetFilters }: JobFiltersProps) {
  // Local state for location input
  const [locationInput, setLocationInput] = useState(filters.location)

  // Update location filter when input changes and user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (locationInput !== filters.location) {
        setFilters({ ...filters, location: locationInput })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [locationInput, filters, setFilters])

  // Handle category checkbox change
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        categories: [...filters.categories, category],
      })
    } else {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      })
    }
  }

  // Handle urgency checkbox change
  const handleUrgencyChange = (urgency: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        urgency: [...filters.urgency, urgency],
      })
    } else {
      setFilters({
        ...filters,
        urgency: filters.urgency.filter((u) => u !== urgency),
      })
    }
  }

  // Handle date posted radio change
  const handleDatePostedChange = (value: string) => {
    setFilters({
      ...filters,
      datePosted: value,
    })
  }

  // Handle job type checkbox change
  const handleJobTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        jobType: [...filters.jobType, type],
      })
    } else {
      setFilters({
        ...filters,
        jobType: filters.jobType.filter((t) => t !== type),
      })
    }
  }

  // Handle experience level checkbox change
  const handleExperienceLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        experienceLevel: [...filters.experienceLevel, level],
      })
    } else {
      setFilters({
        ...filters,
        experienceLevel: filters.experienceLevel.filter((l) => l !== level),
      })
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-blue-950">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full"
          onClick={resetFilters}
        >
          Reset All
        </Button>
      </div>

      <Separator className="my-5 bg-blue-100" />

      <Accordion type="multiple" defaultValue={["category", "location", "price", "urgency"]} className="space-y-4">
        <AccordionItem value="category" className="border-none">
          <AccordionTrigger className="text-blue-950 hover:text-blue-700 py-2 no-underline">
            <span className="text-base font-medium">Category</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.name.toLowerCase()}`}
                      className="peer h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      checked={filters.categories.includes(category.name)}
                      onChange={(e) => handleCategoryChange(category.name, e.target.checked)}
                    />
                    <label
                      htmlFor={`category-${category.name.toLowerCase()}`}
                      className="ml-3 text-sm font-medium text-blue-700 peer-checked:text-blue-900"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location" className="border-none">
          <AccordionTrigger className="text-blue-950 hover:text-blue-700 py-2 no-underline">
            <span className="text-base font-medium">Location</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Enter location"
                  className="pl-10 border-blue-200 focus-visible:ring-blue-500 rounded-lg py-5"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-blue-700">Distance</Label>
                  <span className="text-sm font-medium text-blue-950">{filters.distance}km</span>
                </div>
                <Slider
                  value={[filters.distance]}
                  min={5}
                  max={50}
                  step={5}
                  onValueChange={(value) => setFilters({ ...filters, distance: value[0] })}
                  className="mt-2"
                  thumbClassName="border-blue-600 bg-blue-600"
                  trackClassName="bg-blue-200"
                />
                <div className="flex items-center justify-between mt-1 text-xs text-blue-600">
                  <span>5km</span>
                  <span>50km</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="text-blue-950 hover:text-blue-700 py-2 no-underline">
            <span className="text-base font-medium">Price Range</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-blue-700">Hourly Rate</Label>
                <span className="text-sm font-medium text-blue-950">
                  €{filters.priceRange[0]} - €{filters.priceRange[1]}
                </span>
              </div>
              <Slider
                value={filters.priceRange}
                min={5}
                max={100}
                step={5}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                className="mt-2"
                thumbClassName="border-blue-600 bg-blue-600"
                trackClassName="bg-blue-200"
              />
              <div className="flex items-center justify-between mt-1 text-xs text-blue-600">
                <span>€5</span>
                <span>€100</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="urgency" className="border-none">
          <AccordionTrigger className="text-blue-950 hover:text-blue-700 py-2 no-underline">
            <span className="text-base font-medium">Urgency</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgency-normal"
                  className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.urgency.includes("Normal")}
                  onChange={(e) => handleUrgencyChange("Normal", e.target.checked)}
                />
                <label htmlFor="urgency-normal" className="ml-3 text-sm font-medium text-blue-700">
                  Normal
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgency-high"
                  className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.urgency.includes("High")}
                  onChange={(e) => handleUrgencyChange("High", e.target.checked)}
                />
                <label htmlFor="urgency-high" className="ml-3 text-sm font-medium text-blue-700">
                  High
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgency-urgent"
                  className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.urgency.includes("Urgent")}
                  onChange={(e) => handleUrgencyChange("Urgent", e.target.checked)}
                />
                <label htmlFor="urgency-urgent" className="ml-3 text-sm font-medium text-blue-700">
                  Urgent
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date" className="border-none">
          <AccordionTrigger className="text-blue-950 hover:text-blue-700 py-2 no-underline">
            <span className="text-base font-medium">Date Posted</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="date-any"
                  name="date-posted"
                  className="h-5 w-5 border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.datePosted === ""}
                  onChange={() => handleDatePostedChange("")}
                />
                <label htmlFor="date-any" className="ml-3 text-sm font-medium text-blue-700">
                  Any time
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="date-24h"
                  name="date-posted"
                  className="h-5 w-5 border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.datePosted === "24h"}
                  onChange={() => handleDatePostedChange("24h")}
                />
                <label htmlFor="date-24h" className="ml-3 text-sm font-medium text-blue-700">
                  Last 24 hours
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="date-week"
                  name="date-posted"
                  className="h-5 w-5 border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.datePosted === "week"}
                  onChange={() => handleDatePostedChange("week")}
                />
                <label htmlFor="date-week" className="ml-3 text-sm font-medium text-blue-700">
                  Last 7 days
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="date-month"
                  name="date-posted"
                  className="h-5 w-5 border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.datePosted === "month"}
                  onChange={() => handleDatePostedChange("month")}
                />
                <label htmlFor="date-month" className="ml-3 text-sm font-medium text-blue-700">
                  Last 30 days
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-5 bg-blue-100" />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg"
          >
            Advanced Filters
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-5 pt-5">
          <div className="space-y-3">
            <Label className="text-base font-medium text-blue-950">Job Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`justify-start border-blue-200 ${
                  filters.jobType.includes("One-time") ? "bg-blue-50" : ""
                } text-blue-700 hover:bg-blue-50 rounded-lg`}
                onClick={() => {
                  const isSelected = filters.jobType.includes("One-time")
                  handleJobTypeChange("One-time", !isSelected)
                }}
              >
                <input
                  type="checkbox"
                  id="type-one-time"
                  className="mr-2 h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.jobType.includes("One-time")}
                  onChange={(e) => handleJobTypeChange("One-time", e.target.checked)}
                />
                One-time
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`justify-start border-blue-200 ${
                  filters.jobType.includes("Recurring") ? "bg-blue-50" : ""
                } text-blue-700 hover:bg-blue-50 rounded-lg`}
                onClick={() => {
                  const isSelected = filters.jobType.includes("Recurring")
                  handleJobTypeChange("Recurring", !isSelected)
                }}
              >
                <input
                  type="checkbox"
                  id="type-recurring"
                  className="mr-2 h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.jobType.includes("Recurring")}
                  onChange={(e) => handleJobTypeChange("Recurring", e.target.checked)}
                />
                Recurring
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium text-blue-950">Experience Level</Label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="exp-entry"
                  className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.experienceLevel.includes("Entry Level")}
                  onChange={(e) => handleExperienceLevelChange("Entry Level", e.target.checked)}
                />
                <label htmlFor="exp-entry" className="ml-3 text-sm font-medium text-blue-700">
                  Entry Level
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="exp-intermediate"
                  className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.experienceLevel.includes("Intermediate")}
                  onChange={(e) => handleExperienceLevelChange("Intermediate", e.target.checked)}
                />
                <label htmlFor="exp-intermediate" className="ml-3 text-sm font-medium text-blue-700">
                  Intermediate
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="exp-expert"
                  className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.experienceLevel.includes("Expert")}
                  onChange={(e) => handleExperienceLevelChange("Expert", e.target.checked)}
                />
                <label htmlFor="exp-expert" className="ml-3 text-sm font-medium text-blue-700">
                  Expert
                </label>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Button
        className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-6 text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
        onClick={() => {
          // This button is now just for visual consistency
          // All filters are applied immediately when changed
        }}
      >
        Apply Filters
      </Button>
    </div>
  )
}
