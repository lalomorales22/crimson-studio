"use client";

import { useState, type FormEvent, useRef } from "react";
import { generateAudio, type GenerateAudioInput } from "@/ai/flows/generate-audio-from-prompt";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mic, Play, Pause, Volume2 } from "lucide-react";

export default function AudioStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setAudioDataUri(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);

    const input: GenerateAudioInput = { prompt };

    try {
      const result = await generateAudio(input);
      if (result.audioDataUri) {
        setAudioDataUri(result.audioDataUri);
        toast({
          title: "Audio Generated Successfully!",
          description: "Your sound creation is ready to play.",
        });
      } else {
         toast({
          title: "Audio Generation Note",
          description: "The AI generated an empty audio. This might be due to model limitations.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        title: "Error Generating Audio",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-xl mx-auto shadow-crimson border-border">
        <CardHeader>
           <div className="flex items-center gap-2 mb-2">
            <Mic className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">AI Audio Studio</CardTitle>
          </div>
          <CardDescription>
            Describe the sound or music you want to create, and let AI bring it to life.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-lg">Audio Prompt</Label>
              <Input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A calm lo-fi beat for studying, Sound of rain on a tin roof"
                required
                className="text-base"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="text-lg px-6 py-3">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Volume2 className="mr-2 h-5 w-5" />
              )}
              Generate Audio
            </Button>
          </CardFooter>
        </form>
      </Card>

      {audioDataUri && (
        <Card className="w-full max-w-xl mx-auto mt-8 shadow-crimson border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Generated Audio</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <audio
              ref={audioRef}
              src={audioDataUri}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full"
              controls
            />
            {/* Basic custom controls could be added here if needed */}
            {/* <Button onClick={togglePlayPause} variant="outline" size="icon" className="mt-2">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button> */}
          </CardContent>
        </Card>
      )}
       {isLoading && !audioDataUri && (
        <Card className="w-full max-w-xl mx-auto mt-8 shadow-crimson border-border">
          <CardContent className="p-6 text-center text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            Generating your audio masterpiece...
          </CardContent>
        </Card>
      )}
    </div>
  );
}
