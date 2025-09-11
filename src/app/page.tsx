import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
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
    </div>
  );
}
