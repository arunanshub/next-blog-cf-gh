"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function Client() {
  return (
    <Button onClick={() => toast.success("hello world")}>
      Click me I run on client
    </Button>
  )
}
