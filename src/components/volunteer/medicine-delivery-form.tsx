
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
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const formSchema = z.object({
  bookNumber: z.string().min(1, 'Book number is required.'),
});

// Placeholder for prescription data
const fakePrescription = [
    { name: 'Paracetamol', quantity: 10 },
    { name: 'Amoxicillin', quantity: 14 },
    { name: 'Vitamin C', quantity: 30 },
]

export function MedicineDeliveryForm() {
  const { toast } = useToast();
  const [prescription, setPrescription] = useState<typeof fakePrescription | null>(null);
  const [submittedBookNumber, setSubmittedBookNumber] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookNumber: '',
    },
  });

  function onFetch(values: z.infer<typeof formSchema>) {
    setSubmittedBookNumber(values.bookNumber);
    setPrescription(fakePrescription); // In a real app, fetch data
    toast({
      title: 'Prescription Fetched',
      description: `Fetched prescription for patient book number ${values.bookNumber}.`,
    });
  }

  function onDeliver() {
      if(!submittedBookNumber) return;
      toast({
          title: "Medicines Delivered",
          description: `Medicines for patient ${submittedBookNumber} marked as delivered.`,
          variant: "success",
      });
      setPrescription(null);
      setSubmittedBookNumber(null);
      form.reset();
  }

  return (
    <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Medicine Delivery
        </CardTitle>
        <CardDescription className="text-center">
          Fetch patient prescription and confirm delivery.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFetch)}>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-2">
                <FormField
                control={form.control}
                name="bookNumber"
                render={({ field }) => (
                    <FormItem className="flex-grow">
                    <FormLabel className="sr-only">Book Number</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter patient book number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="flex-shrink-0" disabled={form.formState.isSubmitting}>
                    Fetch
                </Button>
            </div>

            {prescription && submittedBookNumber && (
                <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">
                        Prescription for: <span className="font-bold text-primary">{submittedBookNumber}</span>
                    </h3>
                    <ul className="space-y-2">
                        {prescription.map((med, index) => (
                            <li key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                               <span>{med.name}</span>
                               <span className="font-mono text-sm bg-background px-2 py-0.5 rounded">Qty: {med.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
          </CardContent>
          {prescription && (
            <CardFooter>
              <Button onClick={onDeliver} className="w-full" variant="success">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Delivered
              </Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
}
