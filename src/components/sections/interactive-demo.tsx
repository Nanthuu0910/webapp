"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getPersonalizedRecommendation } from "@/app/actions";
import { Loader2, Wand2 } from "lucide-react";

export function InteractiveDemo() {
  const [answer, setAnswer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState("");
  const { toast } = useToast();

  const question = "Explain the theory of relativity in simple terms, as if to a 10-year-old.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      toast({
        title: "Answer Required",
        description: "Please provide an answer to the question.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRecommendation("");

    const performanceData = `
      Question: "${question}"
      User's Answer: "${answer}"
    `;

    const result = await getPersonalizedRecommendation(performanceData);

    setIsLoading(false);

    if (result.success && result.recommendations) {
      setRecommendation(result.recommendations);
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <section id="interactive-demo" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Experience TutorAI in Action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Try our interactive demo to see how our AI provides personalized feedback.
          </p>
        </div>
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">AI Tutor Challenge</CardTitle>
            <CardDescription>{question}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full gap-2">
                <Label htmlFor="answer" className="sr-only">Your Answer</Label>
                <Textarea
                  id="answer"
                  placeholder="Type your explanation here..."
                  rows={5}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get AI Feedback
              </Button>
            </CardFooter>
          </form>
          {recommendation && (
            <div className="p-6 pt-0">
              <Card className="bg-secondary p-4">
                <CardHeader className="p-2">
                  <CardTitle className="font-headline text-lg flex items-center">
                    <Wand2 className="mr-2 h-5 w-5 text-primary" />
                    Personalized Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <p className="text-sm text-foreground/90">{recommendation}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
