"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  addMonths,
  subMonths,
} from "date-fns"
import { fr } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Job type definition
interface Job {
  id: number
  clientName: string
  clientAvatar: string
  service: string
  address: string
  date: string
  duration: string
  status: "ongoing" | "upcoming" | "completed"
  payment: string
}

interface JobCalendarProps {
  jobs: Job[]
}

export function JobCalendar({ jobs }: JobCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get days in current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get day names in French
  const dayNames = Array.from({ length: 7 }, (_, i) => format(new Date(2021, 0, i + 1), "EEEEEE", { locale: fr }))

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Navigate to current month
  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  // Get jobs for a specific day
  const getJobsForDay = (day: Date) => {
    return jobs.filter((job) => {
      const jobDate = parseISO(job.date)
      return isSameDay(jobDate, day)
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy", { locale: fr })}</h2>
          <p className="text-sm text-muted-foreground">Calendrier de vos services</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Mois précédent</span>
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Aujourd'hui
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Mois suivant</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b">
            {dayNames.map((day, i) => (
              <div key={i} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day.toUpperCase()}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 auto-rows-fr">
            {daysInMonth.map((day, i) => {
              const dayJobs = getJobsForDay(day)
              const isToday = isSameDay(day, new Date())
              const isCurrentMonth = isSameMonth(day, currentMonth)

              return (
                <div
                  key={i}
                  className={`min-h-[100px] border-b border-r p-1 ${
                    !isCurrentMonth ? "bg-gray-50" : ""
                  } ${isToday ? "bg-blue-50" : ""}`}
                >
                  <div className="flex justify-between">
                    <span
                      className={`text-sm font-medium ${
                        isToday ? "rounded-full bg-blue-600 px-1.5 py-0.5 text-white" : ""
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                    {dayJobs.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {dayJobs.length}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-1 space-y-1 overflow-y-auto">
                    <TooltipProvider>
                      {dayJobs.slice(0, 3).map((job) => (
                        <Tooltip key={job.id}>
                          <TooltipTrigger asChild>
                            <div
                              className={`flex items-center gap-1 rounded-md p-1 text-xs ${
                                job.status === "ongoing"
                                  ? "bg-blue-100 text-blue-700"
                                  : job.status === "upcoming"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              <Avatar className="h-4 w-4">
                                <AvatarImage src={job.clientAvatar || "/placeholder.svg"} alt={job.clientName} />
                                <AvatarFallback>{job.clientName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="truncate">{format(parseISO(job.date), "HH:mm")}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <div className="space-y-1">
                              <p className="font-medium">{job.clientName}</p>
                              <p className="text-xs">{job.service}</p>
                              <p className="text-xs">
                                {format(parseISO(job.date), "HH:mm")} ({job.duration})
                              </p>
                              <p className="text-xs">{job.address}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>

                    {dayJobs.length > 3 && (
                      <div className="text-center text-xs text-muted-foreground">+{dayJobs.length - 3} plus</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
