import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  return (
    <section className="relative h-[80vh] min-h-[400px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Unlock Your Learning Potential
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl">
            Experience a new era of personalized education with TutorAI, your
            on-demand AI-powered learning companion.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#interactive-demo">
                Try The Demo <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
