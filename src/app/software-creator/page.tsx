
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, BrainCircuit, FolderPlus, Sparkles, Save, Download } from "lucide-react";
import { generateSoftwareProject, type GenerateSoftwareProjectInput, type GenerateSoftwareProjectOutput } from "@/ai/flows/generate-software-project";

export default function SoftwareCreatorPage() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isProjectCreated, setIsProjectCreated] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<GenerateSoftwareProjectOutput['projectFiles']>([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectName.trim()) {
      toast({
        title: "Project Name Required",
        description: "Please enter a name for your project.",
        variant: "destructive",
      });
      return;
    }
    setIsProjectCreated(true);
    toast({
      title: `Project "${projectName}" Initialized!`,
      description: "You can now describe the software you want to build.",
    });
  };

  const handleGenerateFiles = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe the software you want to generate.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setGeneratedFiles([]);
    setUserMessage("");

    const input: GenerateSoftwareProjectInput = {
      projectName,
      description: projectDescription,
    };

    try {
      const result = await generateSoftwareProject(input);
      setGeneratedFiles(result.projectFiles);
      setUserMessage(result.userMessage);
      toast({
        title: "Software Generation Complete!",
        description: result.userMessage || "Files have been generated.",
      });
      // For now, just log to console. File display will be in the next step.
      console.log("Generated Files:", result.projectFiles); 
    } catch (error) {
      console.error("Error generating software project:", error);
      toast({
        title: "Error Generating Software",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">Software Creator</CardTitle>
          </div>
          <CardDescription>
            Define your project and describe the software you want to build. AI will help generate the codebase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Setup Pane */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">1. Project Setup</CardTitle>
              </CardHeader>
              <form onSubmit={handleCreateProject}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="projectName" className="text-base">Project Name</Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="e.g., My Awesome App"
                      required
                      disabled={isProjectCreated}
                      className="text-base"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isProjectCreated || !projectName.trim()}>
                    <FolderPlus className="mr-2 h-5 w-5" />
                    {isProjectCreated ? "Project Initialized" : "Initialize Project"}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            {/* AI File Generation Pane */}
            <Card className={`shadow-sm ${!isProjectCreated ? 'opacity-50 pointer-events-none' : ''}`}>
              <CardHeader>
                <CardTitle className="text-xl">2. AI File Generation</CardTitle>
                {!isProjectCreated && <CardDescription className="text-xs">Initialize project first.</CardDescription>}
              </CardHeader>
              <form onSubmit={handleGenerateFiles}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="projectDescription" className="text-base">Describe Your Software</Label>
                    <Textarea
                      id="projectDescription"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="e.g., A simple to-do list app with React and Tailwind CSS..."
                      required
                      disabled={!isProjectCreated || isLoading}
                      className="min-h-[120px] text-base"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={!isProjectCreated || isLoading || !projectDescription.trim()}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-5 w-5" />
                    )}
                    {isLoading ? "Generating..." : "Generate Files"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          {generatedFiles.length > 0 && (
            <Card className="mt-6 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Generated Output</CardTitle>
                {userMessage && <CardDescription>{userMessage}</CardDescription>}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Project: {projectName}</p>
                <p className="text-sm text-muted-foreground">
                  Files generated (check console for content). UI for file display will be added next.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {generatedFiles.map(file => (
                    <li key={file.path} className="text-sm font-mono">{file.path}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" disabled={generatedFiles.length === 0}>
              <Save className="mr-2 h-5 w-5" />
              Save to Gallery (Coming Soon)
            </Button>
            <Button variant="outline" disabled={generatedFiles.length === 0}>
              <Download className="mr-2 h-5 w-5" />
              Export Project (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
