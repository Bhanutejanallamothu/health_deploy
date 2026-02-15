'use client';

import { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth, useFirestore, setDocumentNonBlocking } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc } from 'firebase/firestore';
import { FlippablePasswordInput } from "@/components/ui/flippable-password-input";
import { cn } from '@/lib/utils';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  username: z.string().min(2, "Username must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().length(10, "Please enter a 10-digit phone number."),
  age: z.coerce.number().int().min(18, "You must be at least 18 years old.").max(100, "Please enter a valid age."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function VolunteerSignupPage() {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      age: undefined,
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
     if (!auth || !firestore) {
        toast({
            title: 'Auth service not available',
            description: 'Please try again later.',
            variant: 'destructive',
        });
        return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userData = {
            uid: user.uid,
            name: values.name,
            username: values.username,
            email: values.email,
            phone: values.phone,
            age: values.age,
        };
        setDocumentNonBlocking(userDocRef, userData, { merge: true });
      }

      toast({
        title: "Account Created!",
        description: "Your volunteer account has been created successfully.",
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message || "Could not create account.",
        variant: "destructive",
      });
    }
  }

  return (
    <div
      className={cn(
        'login-container min-h-screen font-sans',
        isActive && 'active'
      )}
      onMouseEnter={() => setIsActive(true)}
    >
      <div className="top"></div>
      <div className="bottom"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="center w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-card-foreground">Create Your Account</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 10-digit phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter age (18-100)" value={field.value ?? ''} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password <span className="text-destructive">*</span></FormLabel>
                     <FormControl>
                      <FlippablePasswordInput {...field} placeholder="Enter password (min 6 characters)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full mt-6" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
            <p className="text-sm text-muted-foreground mt-4 text-center">
                Already have an account?{' '}
                <Link
                href="/"
                className="font-semibold text-primary hover:underline"
                >
                Log in
                </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
