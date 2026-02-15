
'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edit, User, Mail, Phone, Calendar } from "lucide-react";
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  username: z.string().min(2, "Username must be at least 2 characters."),
  phone: z.string().length(10, "Please enter a 10-digit phone number."),
  age: z.coerce.number().int().min(18, "You must be at least 18 years old.").max(100, "Please enter a valid age."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      username: '',
      phone: '',
      age: undefined,
    }
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name || '',
        username: userProfile.username || '',
        phone: userProfile.phone || '',
        age: userProfile.age || undefined,
      });
    }
  }, [userProfile, form]);

  async function onSubmit(values: ProfileFormValues) {
    if (!userDocRef) {
        toast({ title: "Error", description: "User reference not found.", variant: "destructive" });
        return;
    }
    try {
      await updateDoc(userDocRef, values);
      toast({ title: "Success", description: "Your profile has been updated." });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to update profile.", variant: "destructive" });
    }
  }


  if (isUserLoading || isProfileLoading) {
    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4">
            <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm p-6">
                <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                </div>
                 <div className="space-y-6 mt-8">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </Card>
        </div>
    );
  }

  const initial = userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || 'V');

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
        <CardHeader className="items-center text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarFallback className="text-4xl">{initial}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{userProfile?.name || 'Volunteer'}</CardTitle>
          <CardDescription>{userProfile?.username ? `@${userProfile.username}` : user?.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
                 <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Camps Attended</p>
                    <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Patients Viewed</p>
                    <p className="text-2xl font-bold">150</p>
                </div>
            </div>
            
            <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">{user?.email}</p>
                </div>
                {userProfile?.phone && (
                    <div className="flex items-center">
                        <Phone className="mr-3 h-5 w-5 text-muted-foreground" />
                        <p className="text-sm">{userProfile.phone}</p>
                    </div>
                )}
                {userProfile?.age && (
                    <div className="flex items-center">
                        <Calendar className="mr-3 h-5 w-5 text-muted-foreground" />
                        <p className="text-sm">{userProfile.age} years old</p>
                    </div>
                )}
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-4">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Your Profile</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
