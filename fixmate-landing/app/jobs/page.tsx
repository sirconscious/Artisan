"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Filter, Grid3X3, ListFilter, Plus, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobFilters } from "@/components/job-filters"
import { JobCard } from "@/components/job-card"
import { JobList } from "@/components/job-list"
import { CategoryPills } from "@/components/category-pills"
import { NavBar } from "@/components/nav-bar"

// Categories for filtering
const categories = [
  { name: "All Categories", icon: "🔍" },
  { name: "Cleaning", icon: "✨" },
  { name: "Gardening", icon: "🌱" },
  { name: "Plumbing", icon: "🔧" },
  { name: "Electrical", icon: "⚡" },
  { name: "Childcare", icon: "👶" },
  { name: "Moving", icon: "📦" },
  { name: "Cooking", icon: "🍳" },
  { name: "Pet Care", icon: "🐾" },
  { name: "Tutoring", icon: "📚" },
  { name: "Handyman", icon: "🔨" },
  { name: "Other", icon: "🔍" },
]

// Mock data for jobs
const jobsData = [
  {
    id: "1",
    title: "House Cleaning - 3 Bedroom Home",
    category: "Cleaning",
    location: "Paris, France",
    rate: "€25/hour",
    rateValue: 25,
    description:
      "Looking for a thorough house cleaning for a 3-bedroom home. Tasks include dusting, vacuuming, mopping, bathroom cleaning, and kitchen cleaning.",
    postedBy: "Marie Dupont",
    postedDate: "2 days ago",
    postedTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    urgency: "Normal",
    estimatedHours: "4-5 hours",
    applications: 3,
    status: "Open",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviews: 24,
    jobType: "One-time",
    experienceLevel: "Entry Level",
    distance: 8, // in km
  },
  {
    id: "2",
    title: "Garden Maintenance - Weekly Service",
    category: "Gardening",
    location: "Lyon, France",
    rate: "€30/hour",
    rateValue: 30,
    description:
      "Need a gardener for weekly maintenance of a medium-sized garden. Tasks include lawn mowing, weeding, pruning, and general upkeep.",
    postedBy: "Jean Martin",
    postedDate: "1 day ago",
    postedTimestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    urgency: "High",
    estimatedHours: "3 hours/week",
    applications: 5,
    status: "Open",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.5,
    reviews: 18,
    jobType: "Recurring",
    experienceLevel: "Intermediate",
    distance: 15, // in km
  },
  {
    id: "3",
    title: "Plumbing Repair - Leaking Faucet",
    category: "Plumbing",
    location: "Marseille, France",
    rate: "€40/hour",
    rateValue: 40,
    description: "Urgent repair needed for a leaking kitchen faucet. Professional plumber required with own tools.",
    postedBy: "Sophie Bernard",
    postedDate: "5 hours ago",
    postedTimestamp: Date.now() - 5 * 60 * 60 * 1000, // 5 hours ago
    urgency: "Urgent",
    estimatedHours: "1-2 hours",
    applications: 2,
    status: "Open",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviews: 32,
    jobType: "One-time",
    experienceLevel: "Expert",
    distance: 22, // in km
  },
  {
    id: "4",
    title: "Electrical Installation - New Light Fixtures",
    category: "Electrical",
    location: "Toulouse, France",
    rate: "€45/hour",
    rateValue: 45,
    description:
      "Need an electrician to install 5 new light fixtures throughout the house. Must be certified and have experience.",
    postedBy: "Pierre Dubois",
    postedDate: "3 days ago",
    postedTimestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    urgency: "Normal",
    estimatedHours: "3-4 hours",
    applications: 4,
    status: "Open",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviews: 15,
    jobType: "One-time",
    experienceLevel: "Expert",
    distance: 5, // in km
  },
  {
    id: "5",
    title: "Babysitting - Weekday Evenings",
    category: "Childcare",
    location: "Nice, France",
    rate: "€18/hour",
    rateValue: 18,
    description:
      "Looking for a reliable babysitter for two children (ages 5 and 7) on weekday evenings from 6pm to 9pm. Experience and references required.",
    postedBy: "Claire Moreau",
    postedDate: "1 week ago",
    postedTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
    urgency: "Normal",
    estimatedHours: "15 hours/week",
    applications: 8,
    status: "Open",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    reviews: 27,
    jobType: "Recurring",
    experienceLevel: "Intermediate",
    distance: 12, // in km
  },
  {
    id: "6",
    title: "Moving Assistance - Small Apartment",
    category: "Moving",
    location: "Bordeaux, France",
    rate: "€22/hour",
    rateValue: 22,
    description:
      "Need help moving from a small 1-bedroom apartment to a new location. Tasks include lifting furniture and boxes. Moving date is next Saturday.",
    postedBy: "Thomas Petit",
    postedDate: "4 days ago",
    postedTimestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
    urgency: "High",
    estimatedHours: "5-6 hours",
    applications: 6,
    status: "Open",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.4,
    reviews: 12,
    jobType: "One-time",
    experienceLevel: "Entry Level",
    distance: 18, // in km
  },
  {
    id: "7",
    title: "Pet Sitting - Weekend Trip",
    category: "Pet Care",
    location: "Lille, France",
    rate: "€20/hour",
    rateValue: 20,
    description:
      "Need someone to take care of two cats over a weekend. Responsibilities include feeding, cleaning litter boxes, and playing with the cats.",
    postedBy: "Emilie Laurent",
    postedDate: "2 days ago",
    postedTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    urgency: "Normal",
    estimatedHours: "2 hours/day",
    applications: 4,
    status: "Open",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviews: 9,
    jobType: "One-time",
    experienceLevel: "Entry Level",
    distance: 10, // in km
  },
  {
    id: "8",
    title: "Math Tutoring - High School Level",
    category: "Tutoring",
    location: "Strasbourg, France",
    rate: "€35/hour",
    rateValue: 35,
    description:
      "Looking for a math tutor for a high school student struggling with calculus. Sessions would be twice a week for 1.5 hours each.",
    postedBy: "Philippe Martin",
    postedDate: "5 days ago",
    postedTimestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    urgency: "Normal",
    estimatedHours: "3 hours/week",
    applications: 3,
    status: "Open",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviews: 21,
    jobType: "Recurring",
    experienceLevel: "Expert",
    distance: 7, // in km
  },
]

export default function JobsPage() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // State for filters
  const [filters, setFilters] = useState({
    categories: [],
    location: "",
    distance: 25,
    priceRange: [5, 100],
    urgency: [],
    datePosted: "",
    jobType: [],
    experienceLevel: [],
  })

  // State for filtered jobs
  const [filteredJobs, setFilteredJobs] = useState(jobsData)

  // State for selected category from pills
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  // Apply filters when filters state changes
  useEffect(() => {
    let result = [...jobsData]

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.category.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query),
      )
    }

    // Apply category filter from pills or filter panel
    if (selectedCategory && selectedCategory !== "All Categories") {
      result = result.filter((job) => job.category === selectedCategory)
    } else if (filters.categories.length > 0) {
      result = result.filter((job) => filters.categories.includes(job.category))
    }

    // Apply location filter
    if (filters.location) {
      result = result.filter((job) => job.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    // Apply distance filter
    if (filters.distance) {
      result = result.filter((job) => job.distance <= filters.distance)
    }

    // Apply price range filter
    if (filters.priceRange) {
      result = result.filter((job) => job.rateValue >= filters.priceRange[0] && job.rateValue <= filters.priceRange[1])
    }

    // Apply urgency filter
    if (filters.urgency.length > 0) {
      result = result.filter((job) => filters.urgency.includes(job.urgency))
    }

    // Apply date posted filter
    if (filters.datePosted) {
      const now = Date.now()
      let timeThreshold

      switch (filters.datePosted) {
        case "24h":
          timeThreshold = now - 24 * 60 * 60 * 1000 // 24 hours
          break
        case "week":
          timeThreshold = now - 7 * 24 * 60 * 60 * 1000 // 7 days
          break
        case "month":
          timeThreshold = now - 30 * 24 * 60 * 60 * 1000 // 30 days
          break
        default:
          timeThreshold = 0
      }

      if (timeThreshold > 0) {
        result = result.filter((job) => job.postedTimestamp >= timeThreshold)
      }
    }

    // Apply job type filter
    if (filters.jobType.length > 0) {
      result = result.filter((job) => filters.jobType.includes(job.jobType))
    }

    // Apply experience level filter
    if (filters.experienceLevel.length > 0) {
      result = result.filter((job) => filters.experienceLevel.includes(job.experienceLevel))
    }

    setFilteredJobs(result)
  }, [searchQuery, filters, selectedCategory])

  // Handle category selection from pills
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    // Reset category filters in the filter panel
    setFilters({
      ...filters,
      categories: [],
    })
  }

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      categories: [],
      location: "",
      distance: 25,
      priceRange: [5, 100],
      urgency: [],
      datePosted: "",
      jobType: [],
      experienceLevel: [],
    })
    setSelectedCategory("All Categories")
    setSearchQuery("")
  }

  // Featured jobs (top 3 by rating)
  const featuredJobs = [...jobsData].sort((a, b) => b.rating - a.rating).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0  z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('/images/hero.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50 z-0"></div>

        <div className="container relative z-10 mx-auto py-16 px-4 sm:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              Find the Perfect Service Provider
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Connect with skilled professionals for all your home service needs
            </p>

            <div className="relative mt-8 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-blue-300" />
                  </div>
                  <Input
                    type="search"
                    placeholder="What service do you need?"
                    className="pl-10 h-14 rounded-lg border-0 bg-white/95 backdrop-blur-sm text-blue-950 placeholder:text-blue-400 focus-visible:ring-2 focus-visible:ring-white shadow-lg w-full"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <Button className="h-14 rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-8 shadow-lg text-base font-medium">
                  Search
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-md rounded-full px-6 font-medium"
                >
                  <Link href="/post-job">
                    <Plus className="mr-2 h-5 w-5" />
                    Post a Job
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 rounded-full px-6 font-medium"
                >
                  <Filter className="mr-2 h-5 w-5" />
                  Browse Categories
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto fill-current text-blue-50"
            preserveAspectRatio="none"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Category pills */}
      <div className="container mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-blue-950 mb-4">Popular Categories</h2>
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>
      </div>

      {/* Featured jobs section */}
      <div className="container mx-auto py-16 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-950 mb-1">Featured Jobs</h2>
            <p className="text-blue-600">Top opportunities that might interest you</p>
          </div>
          <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} featured />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto pb-20 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-950 mb-1">All Available Jobs</h2>
            <p className="text-blue-600">Browse and find the perfect service for your needs</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-full h-9 px-4"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Sort
            </Button>
            <Tabs defaultValue="grid" className="w-[110px]">
              <TabsList className="h-9 bg-blue-100/50 rounded-full">
                <TabsTrigger
                  value="grid"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  <ListFilter className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                <JobFilters
                  categories={categories.filter((c) => c.name !== "All Categories")}
                  filters={filters}
                  setFilters={setFilters}
                  resetFilters={resetFilters}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-lg border border-blue-100 lg:hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-blue-950">Quick Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full"
                  onClick={resetFilters}
                >
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-blue-200 ${
                    selectedCategory === "All Categories"
                      ? "bg-blue-50 text-blue-700"
                      : "text-blue-700 hover:bg-blue-50"
                  } rounded-full`}
                  onClick={() => handleCategorySelect("All Categories")}
                >
                  All Categories
                </Button>
                {categories.slice(1, 5).map((category) => (
                  <Button
                    key={category.name}
                    variant="outline"
                    size="sm"
                    className={`border-blue-200 ${
                      selectedCategory === category.name ? "bg-blue-50 text-blue-700" : "text-blue-700 hover:bg-blue-50"
                    } rounded-full`}
                    onClick={() => handleCategorySelect(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 flex items-center rounded-full"
                >
                  <Filter className="mr-1 h-3 w-3" />
                  More Filters
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-400" />
              </div>
              <Input
                type="search"
                placeholder="Search jobs..."
                className="pl-11 py-6 border-blue-200 bg-white focus-visible:ring-blue-500 rounded-xl shadow-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Active filters display */}
            {(filters.categories.length > 0 ||
              filters.urgency.length > 0 ||
              filters.jobType.length > 0 ||
              filters.experienceLevel.length > 0 ||
              filters.location ||
              filters.datePosted ||
              selectedCategory !== "All Categories") && (
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-blue-700">Active Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-full text-xs px-2"
                    onClick={resetFilters}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== "All Categories" && (
                    <div className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 flex items-center">
                      Category: {selectedCategory}
                      <button
                        className="ml-2 text-blue-400 hover:text-blue-600"
                        onClick={() => handleCategorySelect("All Categories")}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {filters.categories.map((category) => (
                    <div
                      key={category}
                      className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 flex items-center"
                    >
                      {category}
                      <button
                        className="ml-2 text-blue-400 hover:text-blue-600"
                        onClick={() =>
                          setFilters({
                            ...filters,
                            categories: filters.categories.filter((c) => c !== category),
                          })
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {filters.urgency.map((urgency) => (
                    <div
                      key={urgency}
                      className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 flex items-center"
                    >
                      {urgency} Urgency
                      <button
                        className="ml-2 text-blue-400 hover:text-blue-600"
                        onClick={() =>
                          setFilters({
                            ...filters,
                            urgency: filters.urgency.filter((u) => u !== urgency),
                          })
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {filters.location && (
                    <div className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 flex items-center">
                      Location: {filters.location}
                      <button
                        className="ml-2 text-blue-400 hover:text-blue-600"
                        onClick={() => setFilters({ ...filters, location: "" })}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {filters.datePosted && (
                    <div className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 flex items-center">
                      Posted:{" "}
                      {filters.datePosted === "24h"
                        ? "Last 24 hours"
                        : filters.datePosted === "week"
                          ? "Last 7 days"
                          : "Last 30 days"}
                      <button
                        className="ml-2 text-blue-400 hover:text-blue-600"
                        onClick={() => setFilters({ ...filters, datePosted: "" })}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {filters.jobType.map((type) => (
                    <div
                      key={type}
                      className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 flex items-center"
                    >
                      {type}
                      <button
                        className="ml-2 text-blue-400 hover:text-blue-600"
                        onClick={() =>
                          setFilters({
                            ...filters,
                            jobType: filters.jobType.filter((t) => t !== type),
                          })
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {filters.experienceLevel.map((level) => (
                    <div
                      key={level}
                      className="bg-white text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 flex items-center"
                    >
                      {level}
                      <button
                        className="ml-2 text-blue-400 hover:text-blue-600"
                        onClick={() =>
                          setFilters({
                            ...filters,
                            experienceLevel: filters.experienceLevel.filter((l) => l !== level),
                          })
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Tabs defaultValue="grid">
              <TabsContent value="grid" className="mt-0 animate-fade-in">
                {filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-blue-100 shadow-sm">
                    <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-950 mb-2">No jobs found</h3>
                    <p className="text-blue-600 max-w-md mx-auto">
                      We couldn't find any jobs matching your current filters. Try adjusting your search criteria or
                      browse all available jobs.
                    </p>
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700" onClick={resetFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="list" className="mt-0 animate-fade-in">
                {filteredJobs.length > 0 ? (
                  <JobList jobs={filteredJobs} />
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-blue-100 shadow-sm">
                    <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-950 mb-2">No jobs found</h3>
                    <p className="text-blue-600 max-w-md mx-auto">
                      We couldn't find any jobs matching your current filters. Try adjusting your search criteria or
                      browse all available jobs.
                    </p>
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700" onClick={resetFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {filteredJobs.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6">
                <p className="text-sm text-blue-600">
                  Showing <strong>{filteredJobs.length}</strong> of <strong>{jobsData.length}</strong> jobs
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-full"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 bg-blue-500 text-white hover:bg-blue-600 rounded-full w-9 h-9 p-0"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-full w-9 h-9 p-0"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-full w-9 h-9 p-0"
                  >
                    3
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-full"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
