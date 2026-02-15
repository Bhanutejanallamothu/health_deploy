import { PatientStatusTracker } from '@/components/volunteer/patient-status-tracker';

export default function PatientStatusPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-12">
      <PatientStatusTracker />
    </div>
  );
}
