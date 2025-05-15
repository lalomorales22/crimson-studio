"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code, Play, Construction } from "lucide-react";

export default function IdePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Code className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">Mini IDE Environment</CardTitle>
          </div>
          <CardDescription>
            Create, test, and run simple software applications directly in your browser. This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-8 rounded-lg text-center">
            <Construction className="h-24 w-24 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Coming Soon!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our in-browser Mini IDE is being crafted to provide you with a seamless coding experience.
              Stay tuned for updates!
            </p>
          </div>

          <div className="border border-dashed border-border p-6 rounded-lg space-y-4 opacity-50">
            <div>
              <label htmlFor="code-editor" className="block text-sm font-medium text-muted-foreground mb-1">
                Code Editor (Conceptual)
              </label>
              <Textarea
                id="code-editor"
                placeholder="// Your JavaScript code here..."
                className="min-h-[200px] font-mono bg-background/50"
                disabled
              />
            </div>
            <Button disabled className="opacity-50">
              <Play className="mr-2 h-4 w-4" />
              Run Code (Disabled)
            </Button>
             <div>
              <label htmlFor="output-console" className="block text-sm font-medium text-muted-foreground mb-1">
                Output Console (Conceptual)
              </label>
              <Textarea
                id="output-console"
                placeholder="Output will appear here..."
                className="min-h-[100px] font-mono bg-background/50"
                disabled
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
