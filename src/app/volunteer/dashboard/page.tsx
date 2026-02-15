
import { Card } from "@/components/ui/card";
import {
  UserPlus,
  UserCheck,
  HeartPulse,
  ClipboardPenLine,
  Pill,
  Search,
  Users,
  FlaskConical,
  Shield,
  Ticket,
  Hourglass,
  HelpingHand,
  List,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { HoverLightEffect } from "@/components/ui/hover-light-effect";

const dashboardItems = [
  { icon: UserPlus, label: "Patient Registration", number: 1, href: "/volunteer/patient-registration" },
  { icon: UserCheck, label: "Doctor assigning", number: 2, href: "/volunteer/doctor-assigning" },
  { icon: HeartPulse, label: "Vitals", number: 3, href: "/volunteer/vitals" },
  { icon: ClipboardPenLine, label: "Doctor Prescription", number: 4, href: "/volunteer/doctor-prescription" },
  { icon: Pill, label: "Medicine Verification", number: 5, href: "/volunteer/medicine-verification" },
  { icon: Search, label: "Patient Status", number: 6, href: "/volunteer/patient-status" },
  { icon: Users, label: "Counselling", number: 7, href: "/volunteer/counselling" },
  { icon: FlaskConical, label: "Lab", number: 8, href: "/volunteer/lab" },
  { icon: Shield, label: "Patient Support", number: 9, href: "/volunteer/patient-support" },
  { icon: Ticket, label: "Token Generation", number: 10, href: "/volunteer/token-generation" },
  { icon: Hourglass, label: "Patients Waiting", number: 11, href: "/volunteer/patients-waiting" },
  { icon: HelpingHand, label: "Doctor Assistance", number: 12, href: "/volunteer/doctor-assistance" },
  { icon: List, label: "View Queues", number: 13, href: "/volunteer/view-queues" },
  { icon: Truck, label: "Medicine Delivery", number: 14, href: "/volunteer/medicine-delivery" },
  { icon: User, label: "Profile", number: 15, href: "/volunteer/profile" },
];

export default function VolunteerDashboardPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Dashboard</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {dashboardItems.map((item) => (
            <Link key={item.number} href={item.href} passHref>
              <HoverLightEffect>
                <Card
                  className="flex flex-col items-center justify-center p-4 aspect-square text-center bg-card/80 hover:bg-card/90 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer h-full"
                >
                  <item.icon className="w-8 h-8 text-primary mb-2" />
                  <p className="text-sm font-medium text-card-foreground">
                    {item.number}. {item.label}
                  </p>
                </Card>
              </HoverLightEffect>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
