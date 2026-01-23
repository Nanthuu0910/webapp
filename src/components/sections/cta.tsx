import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cta() {
  return (
    <section className="py-16 sm:py-24 bg-accent/10">
      <div className="container text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-accent-foreground">
          Ready to Elevate Your Learning?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-accent-foreground/80">
          Join thousands of students who are achieving their academic goals with TutorAI.
        </p>
        <div className="mt-8">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="/auth">
              Get Started for Free
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
