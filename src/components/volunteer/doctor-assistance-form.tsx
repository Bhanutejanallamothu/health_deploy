
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doctors } from '@/lib/placeholder-data';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  patientIdentifier: z.string().min(1, 'Patient identifier (Book No. or Name) is required.'),
  doctorId: z.string({
    required_error: 'You need to select a doctor to request assistance from.',
  }),
  requestDetails: z.string().min(10, 'Please provide at least 10 characters describing the request.'),
});

export function DoctorAssistanceForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientIdentifier: '',
      requestDetails: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedDoctor = doctors.find((d) => d.id === values.doctorId);
    console.log(values);
    toast({
      title: 'Assistance Requested',
      description: `A request has been sent to ${selectedDoctor?.name} regarding patient ${values.patientIdentifier}.`,
      variant: 'success',
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Request Doctor Assistance
        </CardTitle>
        <CardDescription className="text-center">
          Need help? Send a request to an available doctor.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="patientIdentifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Identifier</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter patient book number or name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} ({doctor.specialty})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="requestDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Assistance</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe the assistance needed..."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Sending Request...' : 'Send Request'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
