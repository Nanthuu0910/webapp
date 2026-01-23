'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { generateQuiz } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types for quiz data
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

type QuizState = 'setup' | 'taking' | 'results';

export function QuizGenerator() {
  const [numQuestions, setNumQuestions] = React.useState(5);
  const [quizState, setQuizState] = React.useState<QuizState>('setup');
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = React.useState<string[]>([]);
  const [score, setScore] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const { toast } = useToast();

  const handleStartQuiz = async () => {
    setIsLoading(true);
    const result = await generateQuiz(numQuestions);
    setIsLoading(false);

    if (result.success && result.questions) {
      setQuestions(result.questions);
      setUserAnswers(new Array(result.questions.length).fill(''));
      setCurrentQuestionIndex(0);
      setQuizState('taking');
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to generate quiz.',
        variant: 'destructive',
      });
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswer === userAnswers[index]) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setQuizState('results');
  };

  const handleRestartQuiz = () => {
    setQuizState('setup');
    setQuestions([]);
    setUserAnswers([]);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  if (quizState === 'setup') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Configure Your Quiz</CardTitle>
          <CardDescription>
            Choose the number of questions you want.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="num-questions">Number of Questions: {numQuestions}</Label>
            <Slider
              id="num-questions"
              min={1}
              max={20}
              step={1}
              value={[numQuestions]}
              onValueChange={(value) => setNumQuestions(value[0])}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartQuiz} className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (quizState === 'taking' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
          <CardDescription className="pt-2 text-lg text-foreground">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={userAnswers[currentQuestionIndex]}
            onValueChange={handleAnswerSelect}
            className="space-y-2"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          {currentQuestionIndex < questions.length - 1 ? (
            <Button onClick={handleNextQuestion}>Next</Button>
          ) : (
            <Button onClick={handleSubmitQuiz} className="bg-primary">
              Submit Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  if (quizState === 'results') {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>Here's how you did!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            {score} / {questions.length}
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            That's a score of {((score / questions.length) * 100).toFixed(0)}%!
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestartQuiz} className="w-full">
            Take Another Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return null;
}