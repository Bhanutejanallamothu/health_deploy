
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
import { Checkbox } from '@/components/ui/checkbox';

const labTests = [
    { id: 'cbp', label: 'CBP' },
    { id: 'creatinine', label: 'CREATININE' },
    { id: 'esr', label: 'ESR' },
    { id: 'rbs', label: 'RBS' },
    { id: 'fbs', label: 'FBS' },
    { id: 'crp', label: 'CRP' },
    { id: 'tsh', label: 'TSH' },
    { id: 'thyroid', label: 'THYROID PROFILE' },
] as const;

const formSchema = z.object({
  bookNumber: z.string().min(1, 'Book number is required.'),
  tests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one test.',
  }),
});

export function LabForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookNumber: '',
      tests: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Lab Tests Submitted',
      description: `Lab tests submitted for patient with book number ${values.bookNumber}.`,
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Select Lab Tests
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
                  <FormLabel>Book No:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Book No" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="tests"
              render={() => (
                <FormItem>
                  <div className="space-y-2">
                    {labTests.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="tests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...(field.value || []), item.id]
                                      : (field.value || []).filter(
                                          (value) => value !== item.id
                                        );
                                    field.onChange(updatedValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal w-full text-left">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit Lab Tests'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
