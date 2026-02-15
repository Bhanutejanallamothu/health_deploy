'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect } from 'react';

const medicineDosingSchema = z.object({
  type: z.literal('dosing'),
  medicineId: z.string().min(1, 'Medicine ID is required.'),
  days: z.coerce.number().min(1, 'Days must be at least 1.'),
  morning: z.boolean().default(false),
  afternoon: z.boolean().default(false),
  night: z.boolean().default(false),
  quantity: z.number().default(0),
});

const medicineQuantitySchema = z.object({
  type: z.literal('quantity'),
  medicineId: z.string().min(1, 'Medicine ID is required.'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1.'),
});

const medicineSchema = z.discriminatedUnion('type', [
  medicineDosingSchema,
  medicineQuantitySchema,
]);

const formSchema = z.object({
  bookNumber: z.string().min(1, 'Book number is required.'),
  medicines: z.array(medicineSchema),
});

type FormValues = z.infer<typeof formSchema>;

export function DoctorPrescriptionForm() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookNumber: '',
      medicines: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'medicines',
  });

  const watchMedicines = form.watch('medicines');

  useEffect(() => {
    watchMedicines.forEach((medicine, index) => {
      if (medicine.type === 'dosing') {
        const { days, morning, afternoon, night } = medicine;
        const dosesPerDay = (morning ? 1 : 0) + (afternoon ? 1 : 0) + (night ? 1 : 0);
        const totalQuantity = (days || 0) * dosesPerDay;
        const currentQuantity = form.getValues(`medicines.${index}.quantity`);
        if(totalQuantity !== currentQuantity) {
            form.setValue(`medicines.${index}.quantity`, totalQuantity, { shouldValidate: true });
        }
      }
    });
  }, [watchMedicines, form]);


  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
      title: 'Prescription Submitted',
      description: `Prescription for patient with book number ${values.bookNumber} has been submitted.`,
    });
    form.reset();
  }

  const addDosingItem = () => {
    append({
      type: 'dosing',
      medicineId: '',
      days: 0,
      morning: false,
      afternoon: false,
      night: false,
      quantity: 0,
    });
  };

  const addQuantityItem = () => {
    append({
      type: 'quantity',
      medicineId: '',
      quantity: 0,
    });
  };

  return (
    <Card className="w-full max-w-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Doctor Prescription
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
                    <Input placeholder="Enter Book No" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Medicines</FormLabel>
              <div className="space-y-4 mt-2">
                {fields.map((item, index) => (
                  <Card key={item.id} className="p-4 bg-gray-50">
                    <Tabs defaultValue={item.type} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="dosing" onClick={() => !form.getValues(`medicines.${index}`).type.startsWith("dosing") && form.setValue(`medicines.${index}`, { type: 'dosing', medicineId: '', days: 0, morning: false, afternoon: false, night: false, quantity: 0 })}>By Dosing Schedule</TabsTrigger>
                        <TabsTrigger value="quantity" onClick={() => !form.getValues(`medicines.${index}`).type.startsWith("quantity") && form.setValue(`medicines.${index}`, { type: 'quantity', medicineId: '', quantity: 0 })}>By Quantity</TabsTrigger>
                      </TabsList>
                      <TabsContent value="dosing" className="space-y-4 pt-4">
                         {form.getValues(`medicines.${index}`).type === 'dosing' && (
                           <>
                            <FormField
                                control={form.control}
                                name={`medicines.${index}.medicineId`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medicine ID</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g. 101" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`medicines.${index}.days`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Days</FormLabel>
                                    <FormControl>
                                    <Input type="number" placeholder="e.g. 3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className="flex items-center space-x-4">
                                <FormField
                                    control={form.control}
                                    name={`medicines.${index}.morning`}
                                    render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel className="!mt-0 font-normal">Morning</FormLabel>
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`medicines.${index}.afternoon`}
                                    render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel className="!mt-0 font-normal">Afternoon</FormLabel>
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`medicines.${index}.night`}
                                    render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel className="!mt-0 font-normal">Night</FormLabel>
                                    </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name={`medicines.${index}.quantity`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Calculated Quantity</FormLabel>
                                    <FormControl>
                                    <Input {...field} disabled />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                           </>
                         )}
                      </TabsContent>
                      <TabsContent value="quantity" className="space-y-4 pt-4">
                         {form.getValues(`medicines.${index}`).type === 'quantity' && (
                            <>
                            <FormField
                                control={form.control}
                                name={`medicines.${index}.medicineId`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medicine ID</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g. 101" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`medicines.${index}.quantity`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 10" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </>
                         )}
                      </TabsContent>
                    </Tabs>
                     <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="w-full">
                        Remove
                    </Button>
                  </Card>
                ))}
                <Button type="button" variant="outline" onClick={addDosingItem} className="w-full">
                  Add Item
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gray-800 text-white hover:bg-gray-900" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit Prescription'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
