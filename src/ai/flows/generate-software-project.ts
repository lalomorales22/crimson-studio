
'use server';
/**
 * @fileOverview Generates a simple software project structure based on a user's description.
 *
 * - generateSoftwareProject - A function that handles the software project generation.
 * - GenerateSoftwareProjectInput - The input type for the generateSoftwareProject function.
 * - GenerateSoftwareProjectOutput - The return type for the generateSoftwareProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSoftwareProjectInputSchema = z.object({
  projectName: z.string().describe('The name of the software project.'),
  description: z.string().describe('A detailed description of the software to be generated.'),
});
export type GenerateSoftwareProjectInput = z.infer<typeof GenerateSoftwareProjectInputSchema>;

const GenerateSoftwareProjectOutputSchema = z.object({
  projectFiles: z.array(z.object({ 
      path: z.string().describe("The full path of the file within the project, e.g., 'src/app.js' or 'README.md'."), 
      content: z.string().describe("The complete content of the file.") 
    })).describe("An array of file objects representing the generated project structure."),
  userMessage: z.string().describe("A brief message to the user about the generation process or result."),
});
export type GenerateSoftwareProjectOutput = z.infer<typeof GenerateSoftwareProjectOutputSchema>;

export async function generateSoftwareProject(input: GenerateSoftwareProjectInput): Promise<GenerateSoftwareProjectOutput> {
  return generateSoftwareProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSoftwareProjectPrompt',
  input: {schema: GenerateSoftwareProjectInputSchema},
  output: {schema: GenerateSoftwareProjectOutputSchema},
  prompt: `You are an expert software architect AI. The user wants to create a new project.
Project Name: {{{projectName}}}
User's Description of the project: {{{description}}}

Based on this, generate a small, simple project structure consisting of a few files (e.g., 2-3 files like an HTML page with a JS script, or a Python script with a README.md). 
Provide the output as a JSON object matching the defined output schema, containing an array of 'projectFiles' (each with 'path' and 'content') and a 'userMessage'.
Focus on providing syntactically correct file content for the requested type of project.
Ensure the 'path' for each file is a relative path appropriate for a project structure, e.g., 'index.html', 'src/main.js', 'docs/README.md'.
The 'userMessage' should be a friendly confirmation or note about the generated files.
Example projectFiles for a simple website:
[
  { "path": "index.html", "content": "<!DOCTYPE html><html><head><title>{{{projectName}}}</title></head><body><h1>Welcome to {{{projectName}}}</h1><script src=\"script.js\"></script></body></html>" },
  { "path": "script.js", "content": "console.log('Hello from {{{projectName}}}!');" }
]
Example projectFiles for a python script:
[
  { "path": "{{{projectName}}}.py", "content": "# Main script for {{{projectName}}}\\nprint('Hello from {{{projectName}}}!')" },
  { "path": "README.md", "content": "# {{{projectName}}\\nDescribed as: {{{description}}}" }
]
`,
});

const generateSoftwareProjectFlow = ai.defineFlow(
  {
    name: 'generateSoftwareProjectFlow',
    inputSchema: GenerateSoftwareProjectInputSchema,
    outputSchema: GenerateSoftwareProjectOutputSchema,
  },
  async (input: GenerateSoftwareProjectInput) => {
    const {output} = await prompt(input);
    if (!output) {
      // Fallback in case the LLM output is empty or malformed
      return {
        projectFiles: [],
        userMessage: "The AI couldn't generate the project files as requested. Please try rephrasing your description or try again."
      };
    }
    // Ensure projectFiles is always an array, even if LLM fails to provide it correctly
    return {
        projectFiles: output.projectFiles || [],
        userMessage: output.userMessage || "Project files generated. Note: This is a simplified generation."
    };
  }
);
