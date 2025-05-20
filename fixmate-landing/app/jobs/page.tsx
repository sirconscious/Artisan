"use client"

import { useEffect, useState } from "react"
import { Filter, Search, X, ChevronDown, Zap, Paintbrush, Droplets, Hammer, Home , Plus} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { NavBar } from "@/components/nav-bar"
import axios from "axios"

// Mock data for jobs
const mockJobs = [
  {
    id: 1,
    title: "Fix leaky faucet",
    category: "Plumbing",
    location: "Marrakech",
    price: "$80 - $120",
    description: "Need someone to fix a leaky faucet in my bathroom. It's been dripping for a week and getting worse.",
    postedDate: "2 days ago",
    icon: <Droplets className="h-5 w-5" />,
    longDescription:
      "The bathroom sink faucet has been leaking steadily for about a week. The leak seems to be coming from the base of the faucet handle. I've tried tightening it but that didn't help. Looking for an experienced plumber who can diagnose and fix the issue. Preferably someone who can bring replacement parts if needed. Available weekdays after 5pm or weekends.",
  },
  {
    id: 2,
    title: "Install ceiling fan",
    category: "Electrical",
    location: "Marrakech",
    price: "$150 - $200",
    description: "Need a ceiling fan installed in my bedroom. I have the fan already, just need installation.",
    postedDate: "1 day ago",
    icon: <Zap className="h-5 w-5" />,
    longDescription:
      "I recently purchased a Hunter ceiling fan for my master bedroom and need it professionally installed. There is an existing light fixture in the ceiling that needs to be replaced with the fan. The ceiling is about 9 feet high, so a ladder will be needed. I'd like the installation to include connecting it to the existing wall switch. The fan comes with a remote control as well. Looking for someone with experience installing ceiling fans who can ensure it's properly balanced and secure.",
  },
  {
    id: 3,
    title: "Build custom bookshelf",
    category: "Carpentry",
    location: "Marrakech",
    price: "$300 - $500",
    description:
      "Looking for a carpenter to build a custom bookshelf for my living room. Approximately 6ft tall by 4ft wide.",
    postedDate: "3 days ago",
    icon: <Hammer className="h-5 w-5" />,
    longDescription:
      "I need a custom bookshelf built for my living room. The dimensions should be approximately 6ft tall by 4ft wide, with adjustable shelves. I prefer a modern design with clean lines, painted white to match my existing decor. The bookshelf should be sturdy enough to hold books and some decorative items. I'm flexible on the exact design and open to suggestions from an experienced carpenter. The space has been measured and is ready for the installation. Materials can be discussed, but I prefer high-quality wood that will last for years.",
  },
  {
    id: 4,
    title: "Paint living room",
    category: "Painting",
    location: "Marrakech",
    price: "$400 - $600",
    description: "Need my living room painted (approximately 15x20 feet). Walls only, ceiling was recently done.",
    postedDate: "5 days ago",
    icon: <Paintbrush className="h-5 w-5" />,
    longDescription:
      "Looking for a professional painter to paint my living room. The room is approximately 15x20 feet with 9-foot ceilings. Only the walls need to be painted as the ceiling was recently done. There are a few minor wall imperfections that will need to be patched before painting. I've already purchased the paint (Benjamin Moore, eggshell finish) in a light gray color. The room has standard trim work around doors and windows that will need to be carefully edged. Furniture will be moved to the center of the room and covered. I'm looking for someone who pays attention to detail and can complete the job in 1-2 days.",
  },
  {
    id: 5,
    title: "Fix garbage disposal",
    category: "Plumbing",
    location: "Marrakech",
    price: "$100 - $150",
    description: "Garbage disposal is jammed and making a humming noise. Need it fixed or replaced.",
    postedDate: "1 day ago",
    icon: <Droplets className="h-5 w-5" />,
    longDescription:
      "My kitchen garbage disposal is jammed and making a humming noise when turned on. I've tried the reset button and using an Allen wrench in the bottom, but it's still not working properly. I need someone to either fix the existing unit or replace it if necessary. If replacement is needed, I'd prefer a similar model to my current InSinkErator Badger 5, 1/2 HP. I'm flexible with scheduling and can be available any weekday after 4pm or anytime on weekends.",
  },
  {
    id: 6,
    title: "Replace light fixtures",
    category: "Electrical",
    location: "Marrakech",
    price: "$200 - $300",
    description: "Need to replace 4 outdated light fixtures throughout my apartment with new ones I've purchased.",
    postedDate: "4 days ago",
    icon: <Zap className="h-5 w-5" />,
    longDescription:
      "I have purchased 4 new light fixtures (2 ceiling mounted lights for the bedrooms, 1 pendant light for the dining area, and 1 vanity light for the bathroom) and need them installed to replace the outdated fixtures currently in my apartment. All wiring is already in place, so this should be a straightforward replacement job. I'll need the old fixtures removed and disposed of as well. The ceiling height is standard, about 8 feet. Looking for an experienced electrician who can complete all installations in one visit. Safety and proper installation are my top priorities.",
  },
  {
    id: 7,
    title: "Assemble IKEA furniture",
    category: "Carpentry",
    location: "Marrakech",
    price: "$120 - $180",
    description: "Need help assembling several pieces of IKEA furniture: bed frame, dresser, and desk.",
    postedDate: "2 days ago",
    icon: <Hammer className="h-5 w-5" />,
    longDescription:
      "I recently purchased several pieces of IKEA furniture for my new apartment and need help assembling them. The items include a MALM bed frame with 4 drawers, a HEMNES 8-drawer dresser, and a MICKE desk. All items are still in their original packaging. I have all the necessary tools for assembly, including a drill, screwdrivers, and Allen wrenches. Looking for someone experienced with IKEA furniture assembly who can work efficiently and ensure everything is properly put together. The apartment is on the 3rd floor with elevator access.",
  },
  {
    id: 8,
    title: "Deep clean apartment",
    category: "Cleaning",
    location: "Marrakech",
    price: "$150 - $250",
    description:
      "Need a thorough deep cleaning of my 2-bedroom apartment, including kitchen, bathrooms, and all floors.",
    postedDate: "1 day ago",
    icon: <Home className="h-5 w-5" />,
    longDescription:
      "I'm looking for a thorough deep cleaning of my 2-bedroom, 1-bathroom apartment (approximately 900 sq ft). The cleaning should include: kitchen (inside of oven, refrigerator, microwave, cabinets, countertops), bathroom (shower/tub, toilet, sink, mirror, tiles), dusting all surfaces, vacuuming and mopping all floors, window sills, and baseboards. I will provide all cleaning supplies and equipment. The apartment is generally tidy but hasn't had a deep clean in several months. I'm looking for someone with attention to detail who can make everything spotless. This is potentially a recurring job if I'm satisfied with the service.",
  },
  {
    id: 9,
    title: "Fix deck railing",
    category: "Carpentry",
    location: "Marrakech",
    price: "$250 - $350",
    description:
      "Several posts on my deck railing are loose and need to be secured. About 10 feet of railing affected.",
    postedDate: "3 days ago",
    icon: <Hammer className="h-5 w-5" />,
    longDescription:
      "The railing on my backyard deck has become loose in several places. Approximately 10 feet of railing is affected, with 3-4 posts that need to be properly secured. The deck is about 4 feet off the ground, so safety is a primary concern. The existing railing is wooden and about 10 years old. Some wood may need to be replaced if it's rotted. I'd prefer to maintain the current style of the railing if possible. Looking for someone with experience in deck repair who can ensure the railing is safe and up to code. The job will require power tools, which the contractor should provide.",
  },
  {
    id: 10,
    title: "Install bathroom vanity",
    category: "Plumbing",
    location: "Marrakech",
    price: "$300 - $400",
    description: "Need to replace old bathroom vanity with a new one. Includes sink and faucet installation.",
    postedDate: "5 days ago",
    icon: <Droplets className="h-5 w-5" />,
    longDescription:
      "I've purchased a new bathroom vanity (36\" wide with a cultured marble top) and need it installed to replace my old, damaged one. The job includes removing the old vanity, installing the new one, connecting the sink drain and water supply lines, and installing the new faucet that came with the vanity. The bathroom has easy access and the water shutoff valves are functioning properly. I'd like the old vanity hauled away if possible. Looking for someone with experience in both plumbing and light carpentry who can ensure everything is level, properly sealed, and without leaks. Preferably someone who can complete the job in one day.",
  },
]

// Job card component
const JobCard = ({ job, onClick }: { job: any; onClick: () => void }) => (
  <Card className="overflow-hidden transition-all hover:shadow-md">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {job.icon}
          </div>
          <div>
            <h3 className="font-bold">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.location}</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-50">
          {job.category}
        </Badge>
      </div>
      <p className="mt-4 text-sm">{job.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-medium text-blue-600">{job.price}</p>
        <p className="text-xs text-muted-foreground">Posted {job.postedDate}</p>
      </div>
    </CardContent>
    <CardFooter className="p-0">
      <Button variant="ghost" className="w-full rounded-none py-4 text-blue-600 hover:bg-blue-50" onClick={onClick}>
        View Details
      </Button>
    </CardFooter>
  </Card>
)

// Job details modal component
const JobDetailsModal = ({ job, isOpen, onClose }: { job: any; isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {job.icon}
          </div>
          <DialogTitle>{job.title}</DialogTitle>
        </div>
        <DialogDescription className="flex items-center justify-between pt-2">
          <Badge variant="outline" className="bg-blue-50">
            {job.category}
          </Badge>
          <span className="text-xs text-muted-foreground">Posted {job.postedDate}</span>
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">Location</h4>
          <p className="text-sm">{job.location}</p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Budget</h4>
          <p className="text-sm font-semibold text-blue-600">{job.price}</p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Description</h4>
          <p className="text-sm">{job.longDescription}</p>
        </div>
        <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">Apply for this Job</Button>
      </div>
    </DialogContent>
  </Dialog>
)

export default function JobsPage() {   
  const checkAuth = async(token : string)=>{ 
    try {
      const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) ;
      
    } catch (error) {
      window.location.href = "/login"
    }
  }
  const [show ,setShow] = useState(false)
  useEffect( () => {
    const token = localStorage.getItem("token") 
    
    if (!token) {
      window.location.href = "/login"
    }else{

      checkAuth(token);
    }
    setShow(true)
  })
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("")



  // Filter jobs based on selected filters
  const filteredJobs = mockJobs.filter((job) => {
    // Filter by category
    if (categoryFilter !== "all" && job.category !== categoryFilter) {
      return false
    }

    // Filter by location (simple includes check)
    if (locationFilter && !job.location.toLowerCase().includes(locationFilter.toLowerCase())) {
      return false
    }

    // Filter by price range (simplified for demo)
    const jobMinPrice = Number.parseInt(job.price.split(" - ")[0].replace(/\D/g, ""))
    return jobMinPrice >= priceRange[0]
  })

  const openJobDetails = (job: any) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const closeJobDetails = () => {
    setIsModalOpen(false)
  }

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }
  const redirect = () => {
    window.location.href = "/post-job"
  }
  return (
    <>
    
    {show && (
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1 bg-gray-50">
          <div className="container px-4 py-8 md:px-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Available Jobs</h1>
              <p className="text-muted-foreground">Find and apply for home service jobs in your area</p>
            </div>
          <button onClick={redirect} className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
            
            <div className="flex items-center">

             <Plus /> Drop job

            </div></button>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Mobile filter toggle */}
              <div className="lg:hidden flex justify-between items-center mb-4">
                <Button variant="outline" onClick={toggleMobileFilter} className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {isMobileFilterOpen ? (
                    <ChevronDown className="h-4 w-4 rotate-180" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                <p className="text-sm text-muted-foreground">{filteredJobs.length} jobs found</p>
              </div>
  
              {/* Sidebar filters - desktop always visible, mobile conditional */}
              <div className={`lg:w-1/4 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}>
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold">Filters</h2>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                      Reset
                    </Button>
                  </div>
  
                  <div className="space-y-6">
                    {/* Category filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Plumbing">Plumbing</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Carpentry">Carpentry</SelectItem>
                          <SelectItem value="Painting">Painting</SelectItem>
                          <SelectItem value="Cleaning">Cleaning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
  
                    {/* Location filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Enter location"
                          className="pl-8"
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                        />
                        {locationFilter && (
                          <button className="absolute right-2.5 top-2.5" onClick={() => setLocationFilter("")}>
                            <X className="h-4 w-4 text-muted-foreground" />
                          </button>
                        )}
                      </div>
                    </div>
  
                    {/* Price range filter */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Price Range</label>
                        <span className="text-sm text-muted-foreground">
                          ${priceRange[0]} - ${priceRange[1]}+
                        </span>
                      </div>
                      <Slider
                        defaultValue={[0, 500]}
                        max={500}
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="py-4"
                      />
                    </div>
  
                    {/* Apply filters button - mobile only */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 lg:hidden" onClick={toggleMobileFilter}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
  
              {/* Jobs grid */}
              <div className="lg:w-3/4">
                <div className="hidden lg:flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">{filteredJobs.length} jobs found</p>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                {filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredJobs.map((job) => (
                      <JobCard key={job.id} job={job} onClick={() => openJobDetails(job)} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-lg text-center">
                    <h3 className="font-semibold text-lg mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters to find more jobs</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCategoryFilter("all")
                        setLocationFilter("")
                        setPriceRange([0, 500])
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
  
        {/* Job details modal */}
        {selectedJob && <JobDetailsModal job={selectedJob} isOpen={isModalOpen} onClose={closeJobDetails} />}
      </div>
      
    )} 
        </>

  )
}
