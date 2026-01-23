'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

export function AuthRedirect({ to }: { to: string }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push(to);
    }
  }, [user, isUserLoading, router, to]);

  if (isUserLoading || user) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return null;
}
