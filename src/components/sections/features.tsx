import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Clock, Lightbulb, BarChart3, Code, FileQuestion } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: "Personalized Learning",
    description: "Our AI adapts to your learning style, creating a unique educational path just for you.",
  },
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: "24/7 On-Demand Help",
    description: "Stuck on a problem at 3 AM? TutorAI is always available to help you understand complex topics.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-primary" />,
    title: "Interactive Exercises",
    description: "Engage with dynamic exercises and get instant feedback to accelerate your mastery of any subject.",
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-primary" />,
    title: "Progress Tracking",
    description: "Visualize your growth and identify areas for improvement with our detailed analytics dashboard.",
  },
  {
    icon: <Code className="w-10 h-10 text-primary" />,
    title: "Python Tutor",
    description: "Get expert help with your Python questions from our specialized AI tutor.",
    href: "/chat?tutor=python",
  },
  {
    icon: <FileQuestion className="w-10 h-10 text-primary" />,
    title: "Quiz Generator",
    description: "Create and take multiple-choice quizzes on any topic to test your knowledge.",
    href: "/quiz",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Our Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Discover the tools that make learning with TutorAI effective and enjoyable.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const card = (
              <Card className="flex flex-col items-center text-center p-6 transition-transform transform hover:-translate-y-2 duration-300 h-full">
                <CardHeader>{feature.icon}</CardHeader>
                <CardTitle className="mb-2 text-xl font-bold font-headline">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            );

            return (
              <div key={feature.title}>
                {feature.href ? <Link href={feature.href} className="h-full flex">{card}</Link> : card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}