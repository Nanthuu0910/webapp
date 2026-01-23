import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { UserDataSync } from "@/components/auth/user-data-sync";
import "./globals.css";

export const metadata: Metadata = {
  title: "TutorAI - Your Personal AI Learning Companion",
  description:
    "Engaging AI-powered tutoring to help you master any subject. Try our interactive demo and get personalized learning recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <UserDataSync />
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
