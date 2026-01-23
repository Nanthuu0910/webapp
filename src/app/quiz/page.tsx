import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuizGenerator } from "@/components/quiz/quiz-generator";

export default function QuizPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Quiz Generator
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Test your knowledge by generating a custom quiz.
              </p>
            </div>
            <QuizGenerator />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}