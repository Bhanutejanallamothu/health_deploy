
import { Card, CardContent } from "@/components/ui/card";
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
  Utensils,
} from "lucide-react";
import Link from "next/link";

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
  { icon: Ticket, label: "Token Generation", number: 10, href: "#" },
  { icon: Hourglass, label: "Patients Waiting", number: 11, href: "#" },
  { icon: HelpingHand, label: "Doctor Assistance", number: 12, href: "#" },
  { icon: List, label: "View Queues", number: 13, href: "/volunteer/view-queues" },
  { icon: Truck, label: "Medicine Delivery", number: 14, href: "#" },
  { icon: Utensils, label: "Food", number: 15, href: "#" },
];

export default function VolunteerDashboardPage() {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 py-12">
      <Card className="w-full max-w-4xl p-6 md:p-8">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-8">Dashboard</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dashboardItems.map((item) => (
              <Link key={item.number} href={item.href} passHref>
                <Card
                  className="flex flex-col items-center justify-center p-4 aspect-square text-center hover:shadow-lg transition-shadow cursor-pointer h-full"
                >
                  <item.icon className="w-8 h-8 text-primary mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.number}. {item.label}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
