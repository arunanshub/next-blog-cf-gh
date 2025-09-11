import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import imageAstrophysics from "@/assets/astrophysics-spectrum.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-screen-md p-4 font-sans">
      <div className="flex flex-col gap-4 w-full">
        <Button>hello world</Button>
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
              className="object-contain"
            />
          </div>
          <div className="relative h-96 w-1/2">
            <Image
              src={imageAstrophysics}
              alt="astrophysics spectrum"
              placeholder="blur"
              fill
              className="object-contain"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
