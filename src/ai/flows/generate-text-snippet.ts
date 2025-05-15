// 'use server'
'use server';

/**
 * @fileOverview Generates text snippets or markdown notes from a prompt.
 *
 * - generateTextSnippet - A function that handles the text snippet generation process.
 * - GenerateTextSnippetInput - The input type for the generateTextSnippet function.
 * - GenerateTextSnippetOutput - The return type for the generateTextSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTextSnippetInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate text from.'),
  includeIntroduction: z.boolean().describe('Whether to include an introduction.'),
  includeConclusion: z.boolean().describe('Whether to include a conclusion.'),
  tone: z.string().optional().describe('The tone of the text snippet.'),
});
export type GenerateTextSnippetInput = z.infer<typeof GenerateTextSnippetInputSchema>;

const GenerateTextSnippetOutputSchema = z.object({
  text: z.string().describe('The generated text snippet.'),
});
export type GenerateTextSnippetOutput = z.infer<typeof GenerateTextSnippetOutputSchema>;

export async function generateTextSnippet(input: GenerateTextSnippetInput): Promise<GenerateTextSnippetOutput> {
  return generateTextSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTextSnippetPrompt',
  input: {schema: GenerateTextSnippetInputSchema},
  output: {schema: GenerateTextSnippetOutputSchema},
  prompt: `You are a helpful assistant that generates text snippets or markdown notes from a prompt.

  Prompt: {{{prompt}}}

  {{#if includeIntroduction}}
  Write an introduction.
  {{/if}}

  {{#if includeConclusion}}
  Write a conclusion.
  {{/if}}

  {{#if tone}}
  Write in a {{{tone}}} tone.
  {{/if}}

  Output the text snippet.`,
});

const generateTextSnippetFlow = ai.defineFlow(
  {
    name: 'generateTextSnippetFlow',
    inputSchema: GenerateTextSnippetInputSchema,
    outputSchema: GenerateTextSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
