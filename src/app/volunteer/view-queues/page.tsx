
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { doctors } from "@/lib/placeholder-data";
import Link from "next/link";

export default function ViewQueuesPage() {
  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">Doctor Queues</h1>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">{doctor.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {doctor.specialty}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Queue: 0 | no patients in queue
                  </p>
                </div>
                <Button asChild variant="secondary">
                  <Link href="/volunteer/doctor-assigning">Assign</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
