'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Chatbot } from '@/components/chatbot';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Loader2 } from 'lucide-react';

function ChatPageContent() {
  const searchParams = useSearchParams();
  const tutor = searchParams.get('tutor');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render nothing on the server, the suspense fallback will be shown.
    return null;
  }

  if (!tutor) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>No tutor selected. Please select a tutor from the features page.</p>
      </div>
    );
  }

  return <Chatbot tutor={tutor} />;
}

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col">
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }
        >
          <ChatPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
