
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

const formSchema = z.object({
  bookNumber: z.string().min(1, 'Book number is required.'),
});

export function MedicineVerificationForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Prescription Fetched',
      description: `Fetched prescription for patient with book number ${values.bookNumber}.`,
    });
    // In a real app, you would fetch data and show it.
  }

  return (
    <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Medicine Pickup
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="bookNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Book No" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gray-800 text-white hover:bg-gray-900" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Fetching...' : 'Fetch Prescription'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
