
'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { AnimatedLogoutButton } from "./animated-logout-button";


const navLinks = [
  { href: "/volunteer/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/volunteer/patient-registration", label: "Patient Registration" },
  { href: "/volunteer/view-queues", label: "View Queues" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isAuthPage = useMemo(() => {
    return pathname === "/" || pathname === "/volunteer/signup";
  }, [pathname]);

  if (!isClient || isAuthPage) {
    return null;
  }
  
  return (
    <header className="sticky top-4 z-50 w-full px-4 flex justify-center">
      <div className="flex h-16 items-center rounded-full border border-border/60 bg-background/60 p-2 px-8 shadow-lg backdrop-blur-lg gap-2">
        <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="font-bold text-xl">HMS</span>
            </Link>
        </div>

        <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
                <Link 
                    key={link.href} 
                    href={link.href} 
                    className={cn(
                        "flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                        pathname === link.href && "bg-primary text-primary-foreground"
                    )}
                >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
                </Link>
            ))}
            </nav>
        </div>

        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <AnimatedLogoutButton />
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Mobile Navigation Menu</SheetTitle>
                    <SheetDescription>
                      A list of links to navigate the application.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-6">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-lg font-medium text-muted-foreground hover:text-primary">
                        {link.label}
                      </Link>
                    ))}
                    <div className="mt-4">
                      <Link href="/" className="flex items-center text-lg font-medium text-muted-foreground hover:text-primary">
                        <LogOut className="mr-2 h-5 w-5" />
                        <span>Log out</span>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
