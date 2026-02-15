
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Have a question or want to get involved? We'd love to hear from you.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold font-headline">Get in Touch Directly</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Our Office</h3>
                <p className="text-muted-foreground">123 Health Drive, Med-City, 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-muted-foreground">contact@hospital.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-muted-foreground">(123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>
        <div>
           <ContactForm />
        </div>
      </div>
    </div>
  );
}
