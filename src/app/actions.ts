// src/app/actions.ts
"use server";

import { personalizeAIDemo } from "@/ai/flows/personalize-ai-demo";
import { askPythonTutor } from "@/ai/flows/python-tutor";
import { type TutorInput } from "@/ai/flows/types";

export async function getPersonalizedRecommendation(performanceData: string) {
  try {
    const result = await personalizeAIDemo({ performanceData });
    return { success: true, recommendations: result.recommendations };
  } catch (error) {
    console.error("Error in getPersonalizedRecommendation:", error);
    return { success: false, error: "Sorry, we couldn't generate recommendations at this time. Please try again later." };
  }
}

export async function askTutor(tutor: string, input: TutorInput) {
  try {
    let result;
    if (tutor === 'python') {
      result = await askPythonTutor(input);
    } else {
      throw new Error(`Tutor "${tutor}" not found.`);
    }
    return { success: true, answer: result.answer };
  } catch (error) {
    console.error(`Error in askTutor (${tutor}):`, error);
    return {
      success: false,
      error: "Sorry, I'm having trouble connecting. Please try again later.",
    };
  }
}

// Placeholder type for a quiz question
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export async function generateQuiz(numQuestions: number): Promise<{
  success: boolean;
  questions?: QuizQuestion[];
  error?: string;
}> {
  // In a real app, you would fetch from the API URL in .env
  // const apiUrl = process.env.QUIZ_API_URL;
  // For now, we'll use mock data.

  try {
    console.log(`Generating a quiz with ${numQuestions} questions.`);
    
    // Mock data generation
    const mockQuestions: QuizQuestion[] = Array.from({ length: numQuestions }, (_, i) => ({
      question: `This is mock question number ${i + 1}. What is the correct answer?`,
      options: ['Option A', 'Option B', 'Option C', 'Correct Answer'],
      correctAnswer: 'Correct Answer',
    }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, questions: mockQuestions };
  } catch (error) {
    console.error("Error generating quiz:", error);
    return { success: false, error: 'Failed to generate quiz. Please try again.' };
  }
}