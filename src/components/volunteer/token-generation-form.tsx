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
import { useState } from 'react';

const formSchema = z.object({
  bookNumber: z.string().min(1, 'Book number is required.'),
});

export function TokenGenerationForm() {
  const { toast } = useToast();
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [submittedBookNumber, setSubmittedBookNumber] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedToken(token);
    setSubmittedBookNumber(values.bookNumber);
    toast({
      title: 'Token Generated',
      description: `Token for book number ${values.bookNumber} is ${token}.`,
      variant: 'success'
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Token Generation
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="bookNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Book Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book number to generate a token" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             {generatedToken && submittedBookNumber && (
              <div className="text-center p-6 bg-muted/50 rounded-lg border border-dashed">
                <p className="text-sm font-medium text-muted-foreground">Token for Book No: {submittedBookNumber}</p>
                <p className="text-6xl font-bold tracking-wider text-primary mt-2">{generatedToken}</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Generating...' : 'Generate Token'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
