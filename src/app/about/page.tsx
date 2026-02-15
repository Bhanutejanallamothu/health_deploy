
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const teamMembers = [
  { name: "Dr. Jane Doe", role: "Chief Medical Officer", imageId: "team-member-1" },
  { name: "John Smith", role: "Lead Nurse", imageId: "team-member-2" },
  { name: "Emily White", role: "Volunteer Coordinator", imageId: "team-member-3" },
];

export default function AboutPage() {
  const missionImage = PlaceHolderImages.find(p => p.id === 'about-mission');

  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">About Our Hospital</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Learn about our commitment to providing world-class healthcare.
        </p>
      </header>

      <div className="space-y-16">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            {missionImage && (
              <div className="w-full h-64 md:h-full">
                <Image
                  src={missionImage.imageUrl}
                  alt={missionImage.description}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint={missionImage.imageHint}
                />
              </div>
            )}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold font-headline mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to provide accessible, high-quality healthcare to our community. We believe that everyone deserves access to the best medical care. We strive to foster a healthier community by offering preventative care, health education, and advanced medical treatment.
              </p>
            </div>
          </div>
        </Card>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet Our Team</h2>
            <p className="text-muted-foreground mt-2">The dedicated professionals behind our work.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => {
              const memberImage = PlaceHolderImages.find(p => p.id === member.imageId);
              return (
                <Card key={member.name} className="text-center p-6 border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4">
                      {memberImage && <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint} />}
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold font-headline">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Become a Volunteer</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Ready to make a difference? Join our team of dedicated volunteers and help us provide vital support to patients and staff.
            </p>
            <Button asChild className="mt-6">
                <Link href="/volunteer/signup">Sign Up to Volunteer</Link>
            </Button>
          </div>
        </section>

        <Card className="bg-muted/50 border-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline text-center">Our Background</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center">
              Our hospital was founded with the goal of providing exceptional medical services. What started as a small clinic has grown into a leading healthcare institution serving thousands of patients. We partner with community leaders to ensure our services are effective and culturally sensitive, providing care that truly makes a difference.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
