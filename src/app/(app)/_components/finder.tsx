"use client"

import { useQuery } from "@tanstack/react-query"
import { finder } from "../actions"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function Finder() {
  const { data, isRefetching, isLoading, refetch } = useQuery({
    queryKey: ["finder"],
    queryFn: () => finder(),
  })

  return (
    <div className="flex w-1/2 flex-col gap-4">
      <Button
        onClick={async () => await refetch()}
        disabled={isLoading || isRefetching}
      >
        {isLoading || isRefetching ? "Loading..." : "Reload message"}
      </Button>

      {isLoading || isRefetching ? (
        <>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </>
      ) : (
        <>
          <p>{data?.message}</p>
          <p>{data?.random}</p>
        </>
      )}
    </div>
  )
}
