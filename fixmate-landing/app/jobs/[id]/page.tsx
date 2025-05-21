import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Euro, MapPin, MessageSquare, Share2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock job data
const job = {
  id: "1",
  title: "House Cleaning - 3 Bedroom Home",
  category: "Cleaning",
  location: "Paris, France",
  rate: "€25/hour",
  description:
    "Looking for a thorough house cleaning for a 3-bedroom home. Tasks include dusting, vacuuming, mopping, bathroom cleaning, and kitchen cleaning. The house is approximately 120 square meters with 2 bathrooms. All cleaning supplies will be provided. Looking for someone with experience and attention to detail. References are appreciated but not required. Flexible on the exact date but would prefer sometime next week.",
  postedBy: {
    name: "Marie Dupont",
    image: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    jobsPosted: 12,
  },
  postedDate: "2 days ago",
  urgency: "Normal",
  estimatedHours: "4-5 hours",
  applications: 3,
  status: "Open",
  date: "June 15, 2023",
  time: "Morning (8:00 - 12:00)",
  requirements: ["Previous cleaning experience", "Attention to detail", "Reliable and punctual", "Own transportation"],
  similarJobs: [
    {
      id: "2",
      title: "Apartment Cleaning - Weekly",
      category: "Cleaning",
      location: "Paris, France",
      rate: "€22/hour",
    },
    {
      id: "3",
      title: "Deep Clean for Moving Out",
      category: "Cleaning",
      location: "Lyon, France",
      rate: "€28/hour",
    },
    {
      id: "4",
      title: "Office Cleaning Service",
      category: "Cleaning",
      location: "Marseille, France",
      rate: "€24/hour",
    },
  ],
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Job Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{job.category}</Badge>
                    <Badge variant="outline" className="text-yellow-600 bg-yellow-50">
                      {job.urgency}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 bg-green-50">
                      {job.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </CardDescription>
                </div>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Euro className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Rate</p>
                    <p>{job.rate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p>{job.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p>{job.estimatedHours}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply for this Job</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {job.similarJobs.map((similarJob) => (
                  <Link href={`/jobs/${similarJob.id}`} key={similarJob.id}>
                    <div className="flex items-start justify-between hover:bg-muted p-3 rounded-md transition-colors">
                      <div>
                        <h3 className="font-medium">{similarJob.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {similarJob.location}
                        </p>
                      </div>
                      <p className="text-sm font-medium">{similarJob.rate}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About the Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={job.postedBy.image || "/placeholder.svg"} alt={job.postedBy.name} />
                  <AvatarFallback>{job.postedBy.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{job.postedBy.name}</p>
                  <p className="text-sm text-muted-foreground">Member since 2022</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{job.postedBy.jobsPosted} jobs posted</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{job.postedBy.rating}/5</span>
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Client
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm">Posted</p>
                <p className="text-sm font-medium">{job.postedDate}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Applications</p>
                <p className="text-sm font-medium">{job.applications}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Last Activity</p>
                <p className="text-sm font-medium">Today</p>
              </div>

              <Separator />

              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm font-medium mb-1">Job Status</p>
                <p className="text-sm text-muted-foreground">This job is currently accepting applications</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
