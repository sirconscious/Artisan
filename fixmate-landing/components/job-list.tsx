import Image from "next/image"
import Link from "next/link"
import { Bookmark, Calendar, Clock, MapPin, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface JobListProps {
  jobs: {
    id: string
    title: string
    category: string
    location: string
    rate: string
    description: string
    postedBy: string
    postedDate: string
    urgency: string
    estimatedHours: string
    applications: number
    status: string
    image: string
    rating: number
    reviews: number
  }[]
}

export function JobList({ jobs }: JobListProps) {
  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white rounded-2xl border border-blue-100 p-5 transition-all duration-300 hover:shadow-xl hover:border-blue-200 group"
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="sm:w-[180px] flex-shrink-0">
              <div className="relative w-full aspect-video sm:aspect-square rounded-xl overflow-hidden bg-blue-100 border border-blue-200">
                <Image src={job.image || "/placeholder.svg"} alt={job.category} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-blue-500 hover:text-blue-600 shadow-sm"
                  >
                    <Bookmark className="h-4 w-4" />
                    <span className="sr-only">Save job</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-3">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge
                  className={
                    job.urgency === "Urgent"
                      ? "bg-red-100 text-red-700 hover:bg-red-200 border-none"
                      : job.urgency === "High"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200 border-none"
                  }
                >
                  {job.urgency}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {job.category}
                </Badge>
                <div className="flex items-center text-sm ml-auto">
                  <div className="flex items-center text-amber-500 mr-1.5">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <span className="font-medium text-blue-950">{job.rating}</span>
                  <span className="text-blue-400 ml-1">({job.reviews})</span>
                </div>
              </div>

              <Link href={`/jobs/${job.id}`} className="block group-hover:text-blue-600 transition-colors">
                <h3 className="font-semibold text-xl text-blue-950 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
              </Link>

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center text-blue-600">
                  <MapPin className="h-4 w-4 mr-1.5 text-blue-400 flex-shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <Clock className="h-4 w-4 mr-1.5 text-blue-400 flex-shrink-0" />
                  {job.estimatedHours}
                </div>
                <div className="flex items-center text-blue-600">
                  <Calendar className="h-4 w-4 mr-1.5 text-blue-400 flex-shrink-0" />
                  Posted {job.postedDate} • {job.applications} applications
                </div>
              </div>

              <p className="text-sm text-blue-700/80 line-clamp-2">{job.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-xl font-semibold text-blue-950">{job.rate}</p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow rounded-full px-5"
                  asChild
                >
                  <Link href={`/jobs/${job.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
