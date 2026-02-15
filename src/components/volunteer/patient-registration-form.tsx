
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft } from 'lucide-react';
import { patients } from '@/lib/placeholder-data';
import type { Patient } from '@/lib/types';
import { cn } from '@/lib/utils';

const bookNumberSchema = z.object({
  bookNumber: z.string().min(1, 'Book number is required.'),
});

const patientDetailsSchema = z.object({
  bookNumber: z.string(),
  name: z.string().min(1, 'Name is required.'),
  phone: z.string().min(10, 'Phone number is required.'),
  age: z.coerce.number().positive('Age must be a positive number.'),
  gender: z.enum(['Male', 'Female']),
  area: z.string().min(1, 'Area is required.'),
  tokenNumber: z.string(),
});

type PatientDetails = z.infer<typeof patientDetailsSchema>;

export function PatientRegistrationForm() {
  const { toast } = useToast();
  const [patientData, setPatientData] = useState<PatientDetails | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isExistingPatient, setIsExistingPatient] = useState(false);

  const bookNumberForm = useForm<z.infer<typeof bookNumberSchema>>({
    resolver: zodResolver(bookNumberSchema),
    defaultValues: {
      bookNumber: '',
    },
  });

  const patientDetailsForm = useForm<PatientDetails>({
    resolver: zodResolver(patientDetailsSchema),
  });

  function onBookNumberSubmit(values: z.infer<typeof bookNumberSchema>) {
    const existingPatient = patients.find(p => p.bookNumber === values.bookNumber);
    const token = (Math.random() * 1000).toFixed(0);

    if (existingPatient) {
      const data = { ...existingPatient, tokenNumber: token };
      setPatientData(data);
      patientDetailsForm.reset(data);
      setIsExistingPatient(true);
    } else {
      const newPatient: PatientDetails = {
        bookNumber: values.bookNumber,
        name: '',
        phone: '',
        age: 0,
        gender: 'Male',
        area: '',
        tokenNumber: token,
      };
      setPatientData(newPatient);
      patientDetailsForm.reset(newPatient);
      setIsExistingPatient(false);
    }
    setDataLoaded(true);
  }

  function onPatientDetailsSubmit(values: PatientDetails) {
    console.log(values);
    if (isExistingPatient) {
        toast({
        title: 'Patient Updated',
        description: `Patient ${values.name}'s data has been updated.`,
        });
    } else {
        toast({
        title: 'Patient Registered',
        description: `Patient ${values.name} has been successfully registered.`,
        });
    }
    handleBack();
  }

  function handleBack() {
    setDataLoaded(false);
    setPatientData(null);
    bookNumberForm.reset();
    setIsExistingPatient(false);
  }

  if (dataLoaded && patientData) {
    return (
      <Card className="w-full max-w-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="relative flex items-center justify-center">
            <Button variant="ghost" size="icon" className="absolute left-0" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl font-bold text-center">
              Patient Registration
            </CardTitle>
          </div>
        </CardHeader>
        <Form {...patientDetailsForm}>
          <form onSubmit={patientDetailsForm.handleSubmit(onPatientDetailsSubmit)}>
            <CardContent className="space-y-4">
               <Alert variant="default" className={isExistingPatient ? "bg-blue-100 border-blue-200 text-blue-800" : "bg-green-100 border-green-200 text-green-800"}>
                  <AlertDescription>
                    {isExistingPatient ? 'Existing patient data loaded successfully!' : 'New patient. Please fill the details.'}
                  </AlertDescription>
              </Alert>
              <FormField
                control={patientDetailsForm.control}
                name="bookNumber"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Book Number</FormLabel>
                    <FormControl className="col-span-3">
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage className="col-span-4" />
                  </FormItem>
                )}
              />
              <FormField
                control={patientDetailsForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Name *</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="Enter patient name" {...field} />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3"/>
                  </FormItem>
                )}
              />
              <FormField
                control={patientDetailsForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Phone Number *</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3"/>
                  </FormItem>
                )}
              />
              <FormField
                control={patientDetailsForm.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Age *</FormLabel>
                    <FormControl className="col-span-3">
                      <Input type="number" placeholder="Enter age" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3"/>
                  </FormItem>
                )}
              />
              <FormField
                control={patientDetailsForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Gender</FormLabel>
                    <FormControl className="col-span-3">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Male" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Female" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3"/>
                  </FormItem>
                )}
              />
              <FormField
                control={patientDetailsForm.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Area *</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="Enter area" {...field} />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3"/>
                  </FormItem>
                )}
              />
               <FormField
                control={patientDetailsForm.control}
                name="tokenNumber"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Token Number</FormLabel>
                    <FormControl className="col-span-3">
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage className="col-span-4" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-gray-800 text-white hover:bg-gray-900">
                {isExistingPatient ? 'Update' : 'Save'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Patient Registration
        </CardTitle>
      </CardHeader>
      <Form {...bookNumberForm}>
        <form onSubmit={bookNumberForm.handleSubmit(onBookNumberSubmit)}>
          <CardContent className="space-y-4">
             <FormField
              control={bookNumberForm.control}
              name="bookNumber"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Book Number *</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="Enter patient book number" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
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
  );
}
