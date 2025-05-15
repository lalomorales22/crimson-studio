"use client";

import { useState, type FormEvent, useRef } from "react";
import { generateVideoFromText, type GenerateVideoFromTextInput } from "@/ai/flows/generate-video-from-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Film, Video } from "lucide-react";

export default function VideoToolkitPage() {
  const [textPrompt, setTextPrompt] = useState("");
  const [videoDataUri, setVideoDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setVideoDataUri(null);

    const input: GenerateVideoFromTextInput = { textPrompt };

    try {
      const result = await generateVideoFromText(input);
      if (result.videoDataUri && result.videoDataUri.startsWith('data:video')) {
        setVideoDataUri(result.videoDataUri);
        toast({
          title: "Video Generation Initiated!",
          description: "Your video is being processed. (Note: Actual video generation is a placeholder).",
        });
      } else {
        setVideoDataUri(null); // Explicitly set to null if not a valid data URI
        toast({
          title: "Video Generation Notice",
          description: "The AI flow for video generation currently returns a placeholder. No video will be displayed.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error generating video:", error);
      setVideoDataUri(null);
      toast({
        title: "Error Generating Video",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Film className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">AI Video Toolkit</CardTitle>
          </div>
          <CardDescription>
            Describe the video you envision, and let AI craft a visual story for you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="textPrompt" className="text-lg">Video Description Prompt</Label>
              <Input
                id="textPrompt"
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                placeholder="e.g., A futuristic cityscape at sunset, A cat chasing a laser pointer"
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
                <Video className="mr-2 h-5 w-5" />
              )}
              Generate Video
            </Button>
          </CardFooter>
        </form>
      </Card>

      {videoDataUri && (
        <Card className="w-full max-w-xl mx-auto mt-8 shadow-crimson border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Generated Video</CardTitle>
          </CardHeader>
          <CardContent>
            <video
              ref={videoRef}
              src={videoDataUri}
              controls
              className="w-full rounded-md aspect-video bg-muted"
            />
          </CardContent>
        </Card>
      )}
      {isLoading && !videoDataUri && (
        <Card className="w-full max-w-xl mx-auto mt-8 shadow-crimson border-border">
          <CardContent className="p-6 text-center text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            Generating your cinematic masterpiece...
             <p className="text-sm mt-2">(Note: Current AI capabilities for video generation are limited. This is a conceptual demonstration.)</p>
          </CardContent>
        </Card>
      )}
       {!isLoading && !videoDataUri && textPrompt && ( // Show this if submission happened but no video URI
        <Card className="w-full max-w-xl mx-auto mt-8 shadow-crimson border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Video Generation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The AI video generation flow is currently a placeholder and does not produce actual video content.
              This interface demonstrates how video generation would work.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
