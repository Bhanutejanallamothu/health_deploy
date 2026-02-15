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
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { doctors } from '@/lib/placeholder-data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  bookNumber: z.string().min(1, 'Book number is required.'),
  doctorId: z.string({
    required_error: 'You need to select a doctor.',
  }),
});

export default function DoctorAssigningPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedDoctor = doctors.find((d) => d.id === values.doctorId);
    console.log(values);
    toast({
      title: 'Doctor Assigned',
      description: `Patient with book number ${values.bookNumber} assigned to ${selectedDoctor?.name}.`,
    });
    form.reset();
  }

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Doctor Assigning
            </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="bookNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter patient book number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Doctor Assigned</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {doctors.map((doctor) => (
                          <FormItem
                            key={doctor.id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={doctor.id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {doctor.name} ({doctor.specialty})
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
