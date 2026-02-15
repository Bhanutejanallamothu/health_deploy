
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patients, doctors } from "@/lib/placeholder-data";
import { User, Clock, Stethoscope, FlaskConical, Pill } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Patient } from "@/lib/types";

const statusIcons: { [key: string]: React.ReactNode } = {
  'Waiting for Doctor': <Clock className="h-5 w-5 text-yellow-500" />,
  'With Doctor': <Stethoscope className="h-5 w-5 text-blue-500" />,
  'Waiting for Lab': <FlaskConical className="h-5 w-5 text-purple-500" />,
  'Waiting for Pharmacy': <Pill className="h-5 w-5 text-green-500" />,
  'Counselling': <User className="h-5 w-5 text-indigo-500" />,
  'Done': <User className="h-5 w-5 text-gray-500" />,
};

const getDoctorName = (doctorId: string | undefined) => {
    if (!doctorId) return 'Unassigned';
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
}

export default function PatientsWaitingPage() {
    const waitingPatients = patients.filter(p => p.status !== 'Done');

  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Patients Waiting</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Live status of patients in the queue for various services.
        </p>
      </header>

      {waitingPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {waitingPatients.map((patient: Patient) => (
            <Card key={patient.bookNumber} className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{patient.name}</CardTitle>
                    <Badge variant="secondary">{patient.tokenNumber}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="flex items-center text-sm text-muted-foreground">
                    {patient.status && statusIcons[patient.status]}
                    <span className="ml-2 font-medium">{patient.status}</span>
                </div>
                <div className="text-sm">
                    <p><span className="font-semibold">Book No:</span> {patient.bookNumber}</p>
                    <p><span className="font-semibold">Doctor:</span> {getDoctorName(patient.assignedDoctorId)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No patients are currently waiting.</p>
        </div>
      )}
    </div>
  );
}
