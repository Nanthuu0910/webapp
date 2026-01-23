'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { useUser } from '@/firebase';
import { UserNav } from '@/components/auth/user-nav';

export function Header() {
  const { user, isUserLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center">
            <Rocket className="mr-2 h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-xl">TutorAI</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isUserLoading ? (
            <div className="h-8 w-24 bg-muted rounded-md animate-pulse" />
          ) : user ? (
            <UserNav />
          ) : (
            <Button asChild>
              <Link href="/auth">Login / Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
