
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { Hourglass } from 'lucide-react';

const formSchema = z.object({
  bookNumber: z.string().min(1, 'Book number is required.'),
});

const statusSteps = [
  'Doctor Assigned',
  'Vitals Recorded',
  'Medicines Prescribed',
  'Medicines Given',
  'Counselling Done',
];

export function PatientStatusTracker() {
  const [submittedBookNumber, setSubmittedBookNumber] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmittedBookNumber(values.bookNumber);
    // In a real app, you'd fetch the patient's actual status here.
  }

  return (
    <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Patient Status Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
            <FormField
              control={form.control}
              name="bookNumber"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex-shrink-0" disabled={form.formState.isSubmitting}>
                Get Status
            </Button>
          </form>
        </Form>

        {submittedBookNumber && (
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-4">
                Status for Book Number: {submittedBookNumber}
            </h3>
            <div className="space-y-3">
              {statusSteps.map((step, index) => (
                <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg">
                  <Hourglass className="h-5 w-5 mr-3 text-yellow-500" />
                  <span className="font-medium text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
