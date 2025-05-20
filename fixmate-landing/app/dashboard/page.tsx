"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import {
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  DollarSign,
  FileText,
  Home,
  MapPin,
  MessageSquare,
  MoreVertical,
  Settings,
  Star,
  ThumbsUp,
  BoxIcon as Toolbox,
  TrendingUp,
  User,
  X,
  Menu,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { JobCalendar } from "@/components/job-calendar"

// Mock data
const profileData = {
  name: "Thomas Dubois",
  profession: "Plombier & Électricien",
  avatar: "/placeholder.svg?height=200&width=200",
  rating: 4.9,
  reviewCount: 124,
  completedJobs: 187,
  onTimePercentage: 98,
  responseRate: 95,
}

const todayStats = {
  jobsToday: 3,
  newRequests: 2,
  earnings: "€240",
  messages: 5,
}

const currentJobs = [
  {
    id: 1,
    clientName: "Marie Laurent",
    clientAvatar: "/placeholder.svg?height=100&width=100",
    service: "Réparation plomberie",
    address: "15 Rue des Lilas, Paris",
    date: "2025-05-20T10:30:00",
    duration: "2h",
    status: "ongoing",
    payment: "€120",
  },
  {
    id: 2,
    clientName: "Jean Dupont",
    clientAvatar: "/placeholder.svg?height=100&width=100",
    service: "Installation électrique",
    address: "8 Avenue Victor Hugo, Lyon",
    date: "2025-05-20T15:00:00",
    duration: "3h",
    status: "upcoming",
    payment: "€180",
  },
  {
    id: 3,
    clientName: "Sophie Martin",
    clientAvatar: "/placeholder.svg?height=100&width=100",
    service: "Réparation plomberie",
    address: "22 Rue de la Paix, Marseille",
    date: "2025-05-21T09:00:00",
    duration: "1h30",
    status: "upcoming",
    payment: "€90",
  },
  {
    id: 4,
    clientName: "Pierre Lefebvre",
    clientAvatar: "/placeholder.svg?height=100&width=100",
    service: "Installation électrique",
    address: "5 Boulevard Saint-Michel, Paris",
    date: "2025-05-19T14:00:00",
    duration: "2h",
    status: "completed",
    payment: "€150",
  },
  {
    id: 5,
    clientName: "Isabelle Moreau",
    clientAvatar: "/placeholder.svg?height=100&width=100",
    service: "Réparation plomberie",
    address: "12 Rue du Commerce, Nice",
    date: "2025-05-19T10:00:00",
    duration: "1h",
    status: "completed",
    payment: "€75",
  },
]

const jobRequests = [
  {
    id: 101,
    clientName: "Camille Bernard",
    clientAvatar: "/placeholder.svg?height=100&width=100",
    service: "Urgence plomberie",
    address: "10 Rue du Commerce, Nice",
    date: "2025-05-21T18:00:00",
    description: "Fuite d'eau sous l'évier de la cuisine causant des dégâts d'eau. Besoin d'une réparation urgente.",
    payment: "€150",
  },
  {
    id: 102,
    clientName: "Pierre Lambert",
    clientAvatar: "/placeholder.svg?height=100&width=100",
    service: "Installation prises électriques",
    address: "17 Avenue des Champs-Élysées, Paris",
    date: "2025-05-24T11:00:00",
    description: "Besoin d'installer 3 nouvelles prises électriques dans mon bureau à domicile.",
    payment: "€110",
  },
]

const earningsData = [
  { day: "Lun", amount: 120 },
  { day: "Mar", amount: 90 },
  { day: "Mer", amount: 0 },
  { day: "Jeu", amount: 180 },
  { day: "Ven", amount: 150 },
  { day: "Sam", amount: 120 },
  { day: "Dim", amount: 0 },
]

const monthlyEarningsData = [
  { week: "Sem 1", amount: 540 },
  { week: "Sem 2", amount: 620 },
  { week: "Sem 3", amount: 750 },
  { week: "Sem 4", amount: 890 },
]

const notifications = [
  {
    id: 1,
    type: "request",
    message: "Nouvelle demande de service de Camille Bernard",
    time: "Il y a 5 minutes",
  },
  {
    id: 2,
    type: "message",
    message: "Jean Dupont vous a envoyé un message",
    time: "Il y a 30 minutes",
  },
  {
    id: 3,
    type: "payment",
    message: "Paiement reçu de €120 pour le service de plomberie",
    time: "Il y a 2 heures",
  },
  {
    id: 4,
    type: "review",
    message: "Sophie Martin vous a laissé une évaluation 5 étoiles",
    time: "Il y a 1 jour",
  },
]

const messages = [
  {
    id: 1,
    sender: "Marie Laurent",
    avatar: "/placeholder.svg?height=100&width=100",
    message: "Bonjour, à quelle heure arriverez-vous aujourd'hui ?",
    time: "Il y a 10 minutes",
    unread: true,
  },
  {
    id: 2,
    sender: "Jean Dupont",
    avatar: "/placeholder.svg?height=100&width=100",
    message: "Merci pour votre travail rapide et efficace !",
    time: "Il y a 2 heures",
    unread: true,
  },
  {
    id: 3,
    sender: "Sophie Martin",
    avatar: "/placeholder.svg?height=100&width=100",
    message: "Pouvez-vous me recommander un bon produit pour entretenir la plomberie ?",
    time: "Hier",
    unread: false,
  },
]

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  // Filter jobs based on status and active tab
  const filteredJobs = currentJobs.filter((job) => {
    if (activeTab === "all") return true
    return job.status === activeTab
  })

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
        <div className="flex items-center gap-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-blue-600" />
                  <span className="text-xl font-bold">Service à la Maison</span>
                </div>

                <div className="flex flex-col items-center py-6">
                  <Avatar className="mb-3 h-20 w-20">
                    <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                    <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{profileData.name}</h3>
                  <p className="text-sm text-muted-foreground">{profileData.profession}</p>
                  <div className="mt-1 flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{profileData.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({profileData.reviewCount} avis)</span>
                  </div>
                </div>

                <Separator />

                <nav className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="justify-start gap-3 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Toolbox className="h-5 w-5" />
                    <span>Tableau de bord</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start gap-3 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Calendrier</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start gap-3 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span>Revenus</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start gap-3 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start gap-3 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Profil</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start gap-3 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Paramètres</span>
                  </Button>
                </nav>

                <Separator />

                <Button variant="ghost" className="justify-start gap-3 px-2 text-red-500 hover:text-red-600">
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <span className="text-lg font-bold">Service à la Maison</span>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {notifications.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-[300px]">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                    <div className="flex w-full items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          notification.type === "request"
                            ? "bg-blue-100 text-blue-600"
                            : notification.type === "message"
                              ? "bg-green-100 text-green-600"
                              : notification.type === "payment"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {notification.type === "request" ? (
                          <FileText className="h-4 w-4" />
                        ) : notification.type === "message" ? (
                          <MessageSquare className="h-4 w-4" />
                        ) : notification.type === "payment" ? (
                          <DollarSign className="h-4 w-4" />
                        ) : (
                          <Star className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-center">
                <span className="text-sm font-medium text-blue-600">Voir toutes les notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Avatar className="h-8 w-8">
            <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
            <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r bg-white md:block">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Service à la Maison</span>
          </div>

          <div className="flex flex-col items-center py-6">
            <Avatar className="mb-3 h-20 w-20">
              <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{profileData.name}</h3>
            <p className="text-sm text-muted-foreground">{profileData.profession}</p>
            <div className="mt-1 flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{profileData.rating}</span>
              <span className="ml-1 text-xs text-muted-foreground">({profileData.reviewCount} avis)</span>
            </div>
          </div>

          <Separator />

          <nav className="flex flex-col gap-1 p-2">
            <Button variant="ghost" className="justify-start gap-3 px-3">
              <Toolbox className="h-5 w-5" />
              <span>Tableau de bord</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-3 px-3">
              <Calendar className="h-5 w-5" />
              <span>Calendrier</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-3 px-3">
              <TrendingUp className="h-5 w-5" />
              <span>Revenus</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-3 px-3">
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-3 px-3">
              <User className="h-5 w-5" />
              <span>Profil</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-3 px-3">
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </Button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-red-500 hover:text-red-600">
              <LogOut className="h-5 w-5" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="container max-w-6xl px-4 py-6 md:px-6 md:py-8">
            {/* Welcome Section */}
            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
              <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                <div>
                  <h1 className="text-2xl font-bold md:text-3xl">Bonjour, {profileData.name} 👋</h1>
                  <p className="mt-1 text-muted-foreground">{format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}</p>

                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <Toolbox className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Services aujourd'hui</p>
                          <p className="text-xl font-bold">{todayStats.jobsToday}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-green-50 p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Nouvelles demandes</p>
                          <p className="text-xl font-bold">{todayStats.newRequests}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenus aujourd'hui</p>
                          <p className="text-xl font-bold">{todayStats.earnings}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-yellow-50 p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                          <MessageSquare className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Nouveaux messages</p>
                          <p className="text-xl font-bold">{todayStats.messages}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 p-4">
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-blue-600">{profileData.completedJobs}</div>
                          <div className="text-xs text-muted-foreground">Services terminés</div>
                        </div>
                        <Separator orientation="vertical" className="h-12" />
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-green-600">{profileData.onTimePercentage}%</div>
                          <div className="text-xs text-muted-foreground">À l'heure</div>
                        </div>
                        <Separator orientation="vertical" className="h-12" />
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-purple-600">{profileData.responseRate}%</div>
                          <div className="text-xs text-muted-foreground">Taux de réponse</div>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium">Niveau de confiance</span>
                          </div>
                          <span className="text-sm font-medium text-blue-600">Excellent</span>
                        </div>
                        <Progress value={95} className="mt-2 h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Current Jobs */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Mes Services</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}
                >
                  {viewMode === "calendar" ? (
                    <>
                      <Toolbox className="h-4 w-4" />
                      <span>Voir services</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      <span>Voir calendrier</span>
                    </>
                  )}
                </Button>
              </div>

              {viewMode === "list" ? (
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-4">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="ongoing">En cours</TabsTrigger>
                    <TabsTrigger value="upcoming">À venir</TabsTrigger>
                    <TabsTrigger value="completed">Terminés</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="mt-0">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredJobs.map((job) => (
                        <Card key={job.id} className="overflow-hidden">
                          <CardHeader className="p-4 pb-0">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <Avatar className="mt-1 h-10 w-10">
                                  <AvatarImage src={job.clientAvatar || "/placeholder.svg"} alt={job.clientName} />
                                  <AvatarFallback>{job.clientName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-base">{job.clientName}</CardTitle>
                                  <CardDescription>{job.service}</CardDescription>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={`${
                                  job.status === "ongoing"
                                    ? "border-blue-200 bg-blue-50 text-blue-700"
                                    : job.status === "upcoming"
                                      ? "border-green-200 bg-green-50 text-green-700"
                                      : "border-gray-200 bg-gray-50 text-gray-700"
                                }`}
                              >
                                {job.status === "ongoing"
                                  ? "En cours"
                                  : job.status === "upcoming"
                                    ? "À venir"
                                    : "Terminé"}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{job.address}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{format(parseISO(job.date), "d MMMM yyyy", { locale: fr })}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {format(parseISO(job.date), "HH:mm", { locale: fr })} ({job.duration})
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span>{job.payment}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t bg-gray-50 p-3">
                            <Button variant="ghost" size="sm" className="gap-1 text-blue-600">
                              <MessageSquare className="h-4 w-4" />
                              <span>Message</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <MoreVertical className="h-4 w-4" />
                              <span>Détails</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <JobCalendar jobs={currentJobs} />
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* New Job Requests */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Nouvelles Demandes</CardTitle>
                    <CardDescription>Demandes de service en attente</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span>Voir tout</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobRequests.map((request) => (
                      <div key={request.id} className="rounded-lg border p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={request.clientAvatar || "/placeholder.svg"} alt={request.clientName} />
                              <AvatarFallback>{request.clientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{request.clientName}</p>
                              <p className="text-sm text-muted-foreground">{request.service}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            Nouvelle
                          </Badge>
                        </div>
                        <div className="mb-3 space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{request.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{format(parseISO(request.date), "d MMMM yyyy", { locale: fr })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{format(parseISO(request.date), "HH:mm", { locale: fr })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{request.payment}</span>
                          </div>
                        </div>
                        <p className="mb-4 text-sm">{request.description}</p>
                        <div className="flex gap-2">
                          <Button className="flex-1 gap-1 bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4" />
                            <span>Accepter</span>
                          </Button>
                          <Button variant="outline" className="flex-1 gap-1 text-red-600 hover:text-red-700">
                            <X className="h-4 w-4" />
                            <span>Refuser</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Earnings Analytics */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Revenus</CardTitle>
                  <CardDescription>Aperçu de vos revenus</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="weekly">
                    <TabsList className="mb-4 grid w-full grid-cols-2">
                      <TabsTrigger value="weekly">Hebdomadaire</TabsTrigger>
                      <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                    </TabsList>
                    <TabsContent value="weekly">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Cette semaine</p>
                          <p className="text-2xl font-bold">€660</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs text-green-600">
                          <TrendingUp className="h-3 w-3" />
                          <span>+12%</span>
                        </div>
                      </div>
                      <div className="h-[200px] w-full">
                        <ChartContainer
                          config={{
                            amount: {
                              label: "Montant (€)",
                              color: "hsl(var(--chart-1))",
                            },
                          }}
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={earningsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                              <YAxis tick={{ fontSize: 12 }} />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="var(--color-amount)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </TabsContent>
                    <TabsContent value="monthly">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Ce mois</p>
                          <p className="text-2xl font-bold">€2,800</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs text-green-600">
                          <TrendingUp className="h-3 w-3" />
                          <span>+8%</span>
                        </div>
                      </div>
                      <div className="h-[200px] w-full">
                        <ChartContainer
                          config={{
                            amount: {
                              label: "Montant (€)",
                              color: "hsl(var(--chart-1))",
                            },
                          }}
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyEarningsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                              <YAxis tick={{ fontSize: 12 }} />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="var(--color-amount)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    Voir rapport détaillé
                  </Button>
                </CardFooter>
              </Card>

              {/* Messages */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Messages récents</CardTitle>
                    <CardDescription>Conversations avec vos clients</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span>Voir tout</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 rounded-lg p-3 ${message.unread ? "bg-blue-50" : "bg-gray-50"}`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                          <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between">
                            <p className="font-medium">{message.sender}</p>
                            <p className="text-xs text-muted-foreground">{message.time}</p>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                        {message.unread && <div className="h-2 w-2 rounded-full bg-blue-600"></div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4" />
                    <span>Ouvrir la messagerie</span>
                  </Button>
                </CardFooter>
              </Card>

              {/* Notifications */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Activité récente</CardTitle>
                    <CardDescription>Dernières notifications et mises à jour</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span>Voir tout</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 rounded-lg border p-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            notification.type === "request"
                              ? "bg-blue-100 text-blue-600"
                              : notification.type === "message"
                                ? "bg-green-100 text-green-600"
                                : notification.type === "payment"
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {notification.type === "request" ? (
                            <FileText className="h-5 w-5" />
                          ) : notification.type === "message" ? (
                            <MessageSquare className="h-5 w-5" />
                          ) : notification.type === "payment" ? (
                            <DollarSign className="h-5 w-5" />
                          ) : (
                            <Star className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{notification.message}</p>
                          <p className="text-sm text-muted-foreground">{notification.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
        <div className="flex items-center justify-around">
          <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3">
            <Toolbox className="h-5 w-5" />
            <span className="mt-1 text-xs">Tableau</span>
          </Button>
          <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3">
            <Calendar className="h-5 w-5" />
            <span className="mt-1 text-xs">Calendrier</span>
          </Button>
          <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3">
            <MessageSquare className="h-5 w-5" />
            <span className="mt-1 text-xs">Messages</span>
          </Button>
          <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3">
            <TrendingUp className="h-5 w-5" />
            <span className="mt-1 text-xs">Revenus</span>
          </Button>
          <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3">
            <User className="h-5 w-5" />
            <span className="mt-1 text-xs">Profil</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
