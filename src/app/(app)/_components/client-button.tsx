"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function ClientButton() {
  return (
    <Button onClick={() => toast.success("Hello world")}>Client Button</Button>
  )
}
