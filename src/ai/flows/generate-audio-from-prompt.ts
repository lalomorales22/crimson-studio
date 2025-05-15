// src/ai/flows/generate-audio-from-prompt.ts
'use server';
/**
 * @fileOverview Generates audio from a text prompt.
 *
 * - generateAudio - A function that generates audio from a prompt.
 * - GenerateAudioInput - The input type for the generateAudio function.
 * - GenerateAudioOutput - The return type for the generateAudio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAudioInputSchema = z.object({
  prompt: z.string().describe('The prompt to use to generate the audio.'),
});
export type GenerateAudioInput = z.infer<typeof GenerateAudioInputSchema>;

const GenerateAudioOutputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      'The generated audio as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type GenerateAudioOutput = z.infer<typeof GenerateAudioOutputSchema>;

export async function generateAudio(input: GenerateAudioInput): Promise<GenerateAudioOutput> {
  return generateAudioFlow(input);
}

const generateAudioPrompt = ai.definePrompt({
  name: 'generateAudioPrompt',
  input: {schema: GenerateAudioInputSchema},
  output: {schema: GenerateAudioOutputSchema},
  prompt: `Generate an audio data URI based on the following prompt: {{{prompt}}}. The audio should be encoded as a base64 data URI.`, 
});

const generateAudioFlow = ai.defineFlow(
  {
    name: 'generateAudioFlow',
    inputSchema: GenerateAudioInputSchema,
    outputSchema: GenerateAudioOutputSchema,
  },
  async input => {
    // Call the generate audio prompt to generate the audio data URI.
    const {output} = await generateAudioPrompt(input);
    return output!;
  }
);
