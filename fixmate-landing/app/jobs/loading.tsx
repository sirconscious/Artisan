import { Loader2 } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

export default function JobsLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <div className="hidden md:block">
          <Skeleton className="h-[600px] w-full" />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Skeleton className="h-10 w-full sm:w-[300px]" />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-2" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[280px] w-full" />
              ))}
          </div>

          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
