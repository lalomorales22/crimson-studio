
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code, Play, Trash2, AlertTriangle, Loader2, Maximize, Minimize } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

export default function IdePage() {
  const [code, setCode] = useState<string>("console.log('Hello from Crimson Canvas Mini IDE!');\n\n// Try some math or string manipulation\nconst a = 10;\nconst b = 20;\nconsole.log(`The sum of ${a} and ${b} is ${a + b}.`);\n\n// Example of an error\n// console.error('This is a test error message.');\n\n// Example of a warning\n// console.warn('This is a test warning message.');\n\n// Try accessing a DOM element (will likely result in an error in this environment)\n// const body = document.querySelector('body');\n// console.log(body);");
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const outputEndRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const handleRunCode = () => {
    if (!isClient) {
      toast({
        title: "Initializing IDE",
        description: "Please wait for the IDE to be ready.",
      });
      return;
    }

    setIsRunning(true);
    setOutput([]); 
    
    setTimeout(() => {
      const newOutput: string[] = [];
      const originalConsole = { ...console };

      const customConsole = (type: 'log' | 'error' | 'warn') => (...args: any[]) => {
        const message = args.map(arg => {
          if (arg instanceof Error) return `Error: ${arg.message}${arg.stack ? `\nStack: ${arg.stack}`: ''}`;
          try {
            return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
          } catch {
            return String(arg);
          }
        }).join(" ");
        newOutput.push(`[${type.toUpperCase()}] ${new Date().toLocaleTimeString()}: ${message}`);
        originalConsole[type](...args); // Also log to browser console
      };

      console.log = customConsole('log');
      console.error = customConsole('error');
      console.warn = customConsole('warn');

      try {
        // WARNING: eval is dangerous. This is for demonstration purposes ONLY.
        eval(code);
        if (newOutput.length === 0) {
          newOutput.push(`[INFO] ${new Date().toLocaleTimeString()}: Code executed. No console output produced.`);
        }
        toast({
          title: "Code Executed",
          description: "Script ran successfully.",
        });
      } catch (error: any) {
        const errorMessage = `[ERROR] ${new Date().toLocaleTimeString()}: ${error.message}${error.stack ? `\nStack:\n${error.stack}`: ''}`;
        newOutput.push(errorMessage);
        originalConsole.error("Execution Error in IDE:", error);
        toast({
          title: "Execution Error",
          description: error.message || "An error occurred.",
          variant: "destructive",
        });
      } finally {
        console.log = originalConsole.log;
        console.error = originalConsole.error;
        console.warn = originalConsole.warn;
        setOutput(newOutput);
        setIsRunning(false);
      }
    }, 300); // Brief delay for UX
  };

  const handleClearOutput = () => {
    setOutput([]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  if (!isClient) {
     return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={`container mx-auto py-8 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4 flex flex-col' : ''}`}>
      <Card className={`w-full ${isFullscreen ? 'flex-1 flex flex-col max-w-full h-full' : 'max-w-4xl'} mx-auto shadow-crimson border-border`}>
        <CardHeader className={`${isFullscreen ? 'pb-3 pt-3' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl font-bold text-primary">Mini IDE</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
          {!isFullscreen && (
            <CardDescription>
              Write, test, and run simple JavaScript snippets. Output from console.log/error/warn will appear below.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className={`space-y-4 ${isFullscreen ? 'flex-1 flex flex-col overflow-hidden p-3 pt-0' : 'p-6'}`}>
          {!isFullscreen && (
            <div className="p-3 border rounded-md bg-destructive/10 text-destructive-foreground border-destructive">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 text-destructive flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Security Warning & Limitations</h4>
                  <p className="text-sm">
                    This IDE uses `eval()` for JavaScript execution, which has security risks. Use with trusted code only. 
                    It's a prototype for basic client-side JS, not a full Node.js or browser environment.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className={`grid grid-cols-1 ${isFullscreen ? 'md:grid-cols-1 flex-1 gap-3' : 'md:grid-cols-2 gap-6'}`}>
            <div className={`space-y-2 ${isFullscreen ? 'flex flex-col h-1/2 md:h-full' : ''}`}>
              <Label htmlFor="code-editor" className="text-lg sr-only md:not-sr-only">Code Editor</Label>
              <Textarea
                id="code-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Your JavaScript code here..."
                className={`font-mono text-sm bg-background/80 border-input focus:border-primary resize-none ${isFullscreen ? 'flex-1 min-h-[200px]' : 'min-h-[300px] md:min-h-[400px]'}`}
                spellCheck="false"
                aria-label="Code Editor"
              />
            </div>
            <div className={`space-y-2 ${isFullscreen ? 'flex flex-col h-1/2 md:h-full' : ''}`}>
              <Label htmlFor="output-console" className="text-lg sr-only md:not-sr-only">Output Console</Label>
              <ScrollArea className={`border rounded-md bg-muted/30 ${isFullscreen ? 'flex-1 min-h-[200px]' : 'min-h-[300px] md:min-h-[400px]'}`}>
                <div className="p-3 font-mono text-xs whitespace-pre-wrap" id="output-console" aria-live="polite">
                  {output.length > 0 ? output.map((line, index) => (
                    <div key={index} className={`${line.startsWith('[ERROR]') ? 'text-destructive' : line.startsWith('[WARN]') ? 'text-yellow-600 dark:text-yellow-400' : 'text-muted-foreground'}`}>
                      {line}
                    </div>
                  )) : <span className="text-muted-foreground italic">Output will appear here...</span>}
                  <div ref={outputEndRef} />
                </div>
              </ScrollArea>
            </div>
          </div>
          
          <div className={`flex flex-wrap gap-3 ${isFullscreen ? 'pt-2 justify-end' : 'justify-end'}`}>
            <Button onClick={handleClearOutput} variant="outline" disabled={isRunning || output.length === 0}>
              <Trash2 /> Clear Output
            </Button>
            <Button onClick={handleRunCode} disabled={isRunning || !isClient} className="min-w-[120px]">
              {isRunning ? <Loader2 className="animate-spin" /> : <Play />}
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
