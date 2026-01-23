'use client';

import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { useUser, useFirestore, useMemoFirebase, useDoc, setDocumentNonBlocking } from '@/firebase';

export function UserDataSync() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (user && userDocRef && !userProfile && !isLoading) {
      // Firebase Auth user exists, but Firestore profile doesn't.
      // This could be a new sign-up via a method that doesn't pre-create the profile.
      const creationTime = user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : 0;
      const lastSignInTime = user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).getTime() : 0;
      
      // Check if this is the user's first sign-in.
      if (creationTime === lastSignInTime) {
        console.log('New user detected, creating profile...');
        const newUserProfile = {
          id: user.uid,
          email: user.email,
          displayName: user.displayName || 'New User',
          signUpDate: new Date(creationTime).toISOString(),
        };
        setDocumentNonBlocking(userDocRef, newUserProfile, { merge: false });
      }
    }
  }, [user, userProfile, isLoading, userDocRef]);

  return null; // This component doesn't render anything
}
