'use server';

/**
 * @fileOverview A flow for personalizing AI tutor feature recommendations based on user demo performance.
 *
 * - personalizeAIDemo - A function that takes user demo performance data and returns personalized AI tutor feature recommendations.
 * - PersonalizeAIDemoInput - The input type for the personalizeAIDemo function.
 * - PersonalizeAIDemoOutput - The return type for the personalizeAIDemo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeAIDemoInputSchema = z.object({
  performanceData: z.string().describe('The user performance data from the AI demo.'),
});
export type PersonalizeAIDemoInput = z.infer<typeof PersonalizeAIDemoInputSchema>;

const PersonalizeAIDemoOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('Personalized recommendations for AI tutor features based on user performance.'),
});
export type PersonalizeAIDemoOutput = z.infer<typeof PersonalizeAIDemoOutputSchema>;

export async function personalizeAIDemo(input: PersonalizeAIDemoInput): Promise<PersonalizeAIDemoOutput> {
  return personalizeAIDemoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeAIDemoPrompt',
  input: {schema: PersonalizeAIDemoInputSchema},
  output: {schema: PersonalizeAIDemoOutputSchema},
  prompt: `Analyze the following user performance data from the AI demo:

  {{{performanceData}}}

  Based on this data, provide personalized recommendations for AI tutor features that would be most helpful to the user.
  Include specific examples of how these features can address the user's needs and improve their learning experience.
  Format the recommendations as a concise paragraph.
  `,
});

const personalizeAIDemoFlow = ai.defineFlow(
  {
    name: 'personalizeAIDemoFlow',
    inputSchema: PersonalizeAIDemoInputSchema,
    outputSchema: PersonalizeAIDemoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
