import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import imageAstrophysics from "@/assets/astrophysics-spectrum.png"
import Finder from "@/app/(app)/_components/finder"

export default function Home() {
  return (
    <div className="mx-auto flex max-w-screen-md flex-col items-center justify-center p-4 font-sans">
      <div className="flex w-full flex-col gap-4">
        <Button>But this has changed</Button>
        <Button variant="destructive">hello world</Button>

        <Card>
          <CardHeader>
            <CardTitle>hello world</CardTitle>
          </CardHeader>

          <CardContent>
            <p>hello world</p>
          </CardContent>
        </Card>

        <section className="flex gap-4">
          <div className="relative h-96 w-1/2">
            <Image
              src={imageAstrophysics}
              alt="astrophysics spectrum"
              placeholder="blur"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
          <div className="relative h-96 w-1/2">
            <Image
              src={imageAstrophysics}
              alt="astrophysics spectrum"
              placeholder="blur"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        </section>

        <Finder />
      </div>
    </div>
  )
}
