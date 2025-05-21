import { Skeleton } from "@/components/ui/skeleton"

export default function JobDetailLoading() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    </div>
  )
}
