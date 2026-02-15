
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FlippablePasswordInput } from '@/components/ui/flippable-password-input';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(''); // Can be email or username
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && user) {
        if (user.email === 'admin@healthreach.org') {
            router.push('/admin');
        } else {
            router.push('/volunteer/dashboard');
        }
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !firestore) {
        toast({
            title: 'Services not available',
            description: 'Please try again later.',
            variant: 'destructive',
        });
        return;
    }
    
    let email = identifier;
    // Simple check if identifier is likely not an email
    if (!identifier.includes('@')) {
      try {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("username", "==", identifier));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          toast({
            title: 'Login Failed',
            description: 'Username not found.',
            variant: 'destructive',
          });
          return;
        }
        email = querySnapshot.docs[0].data().email;
      } catch (error) {
        console.error("Error fetching user by username: ", error);
        toast({
            title: 'Login Failed',
            description: 'Could not verify username.',
            variant: 'destructive',
        });
        return;
      }
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      // The useEffect will handle the redirect
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials.',
        variant: 'destructive',
      });
    }
  };

  if (isUserLoading || user) {
      return (
          <div className="flex items-center justify-center min-h-screen">
              <p>Loading...</p>
          </div>
      );
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
        className="center w-[400px]"
      >
        <h2 className="text-3xl font-bold mb-6 text-card-foreground">
          Hospital Management System
        </h2>
        <form onSubmit={handleLogin} className="w-full">
          <div className="grid gap-4">
            <div className="grid gap-2 text-left">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="Email or Username"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="grid gap-2 relative text-left">
              <Label htmlFor="password">Password</Label>
              <FlippablePasswordInput
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <p className="text-sm text-muted-foreground">
            <Link
              href="#"
              className="font-semibold text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            New to volunteering?{' '}
            <Link
              href="/volunteer/signup"
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
