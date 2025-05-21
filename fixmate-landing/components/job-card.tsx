import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Star, Bookmark } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface JobCardProps {
  job: {
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
  }
  featured?: boolean
}

export function JobCard({ job, featured = false }: JobCardProps) {
  return (
    <Card
      className={`h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl group ${
        featured ? "border-blue-200 shadow-lg" : "border-blue-100 shadow-md hover:border-blue-200"
      }`}
    >
      {featured && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-semibold py-1.5 px-3 text-center">
          Featured Opportunity
        </div>
      )}
      <div className="relative p-5">
        <div className="absolute top-5 right-5 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-blue-500 hover:text-blue-600 shadow-sm"
          >
            <Bookmark className="h-4 w-4" />
            <span className="sr-only">Save job</span>
          </Button>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden shadow-sm border border-blue-200">
            <Image
              src={job.image || "/placeholder.svg"}
              alt={job.category}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
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
            <h3 className="font-semibold text-lg mt-1 text-blue-950 group-hover:text-blue-600 transition-colors line-clamp-2">
              <Link href={`/jobs/${job.id}`} className="hover:underline">
                {job.title}
              </Link>
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-blue-600">
            <MapPin className="h-4 w-4 mr-1.5 text-blue-400 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-blue-600">
              <Clock className="h-4 w-4 mr-1.5 text-blue-400 flex-shrink-0" />
              {job.estimatedHours}
            </div>
            <div className="flex items-center text-blue-600">
              <Calendar className="h-4 w-4 mr-1.5 text-blue-400 flex-shrink-0" />
              {job.postedDate}
            </div>
          </div>

          <p className="text-sm text-blue-700/80 line-clamp-2 min-h-[40px]">{job.description}</p>

          <div className="flex items-center justify-between pt-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {job.category}
            </Badge>
            <div className="flex items-center text-sm">
              <div className="flex items-center text-amber-500 mr-1.5">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="font-medium text-blue-950">{job.rating}</span>
              <span className="text-blue-400 ml-1">({job.reviews})</span>
            </div>
          </div>
        </div>
      </div>

      <CardFooter className="mt-auto p-5 pt-0 flex justify-between items-center">
        <p className="text-lg font-semibold text-blue-950">{job.rate}</p>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow rounded-full px-5"
          asChild
        >
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
