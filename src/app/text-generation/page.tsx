"use client";

import { useState, type FormEvent } from "react";
import { generateTextSnippet, type GenerateTextSnippetInput } from "@/ai/flows/generate-text-snippet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

export default function TextGenerationPage() {
  const [prompt, setPrompt] = useState("");
  const [includeIntroduction, setIncludeIntroduction] = useState(false);
  const [includeConclusion, setIncludeConclusion] = useState(false);
  const [tone, setTone] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setGeneratedText("");

    const input: GenerateTextSnippetInput = {
      prompt,
      includeIntroduction,
      includeConclusion,
      tone: tone || undefined, // Pass undefined if tone is empty
    };

    try {
      const result = await generateTextSnippet(input);
      setGeneratedText(result.text);
      toast({
        title: "Text Generated Successfully!",
        description: "Your creative snippet is ready.",
      });
    } catch (error) {
      console.error("Error generating text snippet:", error);
      toast({
        title: "Error Generating Text",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">AI Text Generation</CardTitle>
          </div>
          <CardDescription>
            Craft compelling text snippets or markdown notes. Describe what you need, and let AI assist you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-lg">Your Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Write a short blog post about sustainable travel..."
                required
                className="min-h-[120px] text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Switch
                  id="includeIntroduction"
                  checked={includeIntroduction}
                  onCheckedChange={setIncludeIntroduction}
                />
                <Label htmlFor="includeIntroduction" className="text-base cursor-pointer">Include Introduction</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="includeConclusion"
                  checked={includeConclusion}
                  onCheckedChange={setIncludeConclusion}
                />
                <Label htmlFor="includeConclusion" className="text-base cursor-pointer">Include Conclusion</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-lg">Tone (Optional)</Label>
              <Input
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="e.g., Formal, Casual, Humorous"
                className="text-base"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="text-lg px-6 py-3">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              Generate Text
            </Button>
          </CardFooter>
        </form>
      </Card>

      {generatedText && (
        <Card className="w-full max-w-2xl mx-auto mt-8 shadow-crimson border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Generated Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none p-4 bg-muted/50 rounded-md whitespace-pre-wrap">
              {generatedText}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
