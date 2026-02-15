import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { camps } from "@/lib/placeholder-data";

export function UpcomingCamps() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Upcoming Camps</h2>
          <p className="text-muted-foreground mt-2">Join us at our next event. Your health is our priority.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {camps.map((camp) => (
            <Card key={camp.id} className="flex flex-col transition-transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline tracking-wide">{camp.location}</CardTitle>
                <CardDescription className="flex items-center pt-2">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span>{camp.date}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{camp.location}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/register">Register</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
