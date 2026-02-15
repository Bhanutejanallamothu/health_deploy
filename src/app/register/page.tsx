
import { RegistrationForm } from "@/components/register/registration-form";

export default function RegisterPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline">Book an Appointment</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to book an appointment.
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}
