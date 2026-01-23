'use server';

/**
 * @fileOverview A flow for a Python programming tutor.
 *
 * - askPythonTutor - A function that takes a conversation history and a new question, and returns an AI-generated answer.
 */

import { ai } from '@/ai/genkit';
import { TutorInputSchema, TutorOutputSchema, type TutorInput, type TutorOutput } from './types';

export async function askPythonTutor(input: TutorInput): Promise<TutorOutput> {
  return pythonTutorFlow(input);
}

const pythonTutorFlow = ai.defineFlow(
  {
    name: 'pythonTutorFlow',
    inputSchema: TutorInputSchema,
    outputSchema: TutorOutputSchema,
  },
  async (input) => {
    const history = input.history.map((msg) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    }));

    const { output } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      system: `You are an expert Python programming tutor for university-level engineering students. Your name is TutorAI.
You must adhere to the following rules:
1.  STRICTLY answer only questions related to Python programming. This includes Python syntax, libraries (like NumPy, Pandas, Matplotlib), algorithms in Python, data structures in Python, and Python-based frameworks (like Django, Flask).
2.  If the user asks a question that is not about Python, you MUST respond with: "I'm sorry, but I am a specialized Python tutor and cannot answer questions on that topic. Please ask me something about Python." Do not apologize further or try to answer the question anyway.
3.  Provide clear, concise, and accurate explanations.
4.  When providing code examples, make them simple, well-commented, and directly related to the user's question.
5.  Do not answer generic greetings like "hello" or "how are you?". If the first question is a greeting, introduce yourself and prompt for a Python question. For example: "Hello! I am TutorAI, your expert Python tutor. What Python topic can I help you with today?".
6.  Maintain a professional, encouraging, and helpful tone suitable for a tutor.`,
      history: history,
      prompt: input.question,
    });

    return { answer: output!.text };
  }
);
