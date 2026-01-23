import { z } from 'genkit';

export const TutorInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ),
  question: z.string().describe("The user's current question about Python."),
});
export type TutorInput = z.infer<typeof TutorInputSchema>;

export const TutorOutputSchema = z.object({
  answer: z.string().describe("The AI tutor's answer to the user's question."),
});
export type TutorOutput = z.infer<typeof TutorOutputSchema>;
