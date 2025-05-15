
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Save, Moon, Sun, Bell, Loader2, Globe } from "lucide-react";

interface AppSettings {
  theme: string;
  notificationsEnabled: boolean;
  emailFrequency: string;
  language: string;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AppSettings>({
    theme: "system",
    notificationsEnabled: true,
    emailFrequency: "daily",
    language: "en",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, load settings from localStorage or API
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem("appSettings", JSON.stringify(settings));
    console.log("Settings saved:", settings);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
    setIsLoading(false);
  };
  
  if (!isClient) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">Application Settings</CardTitle>
          </div>
          <CardDescription>
            Customize your experience with Crimson Canvas. Changes are saved locally.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          {/* Appearance Section */}
          <section className="space-y-4 p-4 border rounded-lg shadow-sm bg-card/50">
            <h3 className="text-xl font-semibold text-foreground flex items-center"><Sun className="mr-2 h-5 w-5 text-accent" />Appearance</h3>
            <div className="space-y-2">
              <Label htmlFor="theme-select">Theme</Label>
              <Select 
                value={settings.theme} 
                onValueChange={(value) => handleSettingChange('theme', value)}
              >
                <SelectTrigger id="theme-select" className="w-full">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light"><Sun className="inline-block mr-2 h-4 w-4" />Light</SelectItem>
                  <SelectItem value="dark"><Moon className="inline-block mr-2 h-4 w-4" />Dark</SelectItem>
                  <SelectItem value="system"><SettingsIcon className="inline-block mr-2 h-4 w-4" />System Default</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose how Crimson Canvas looks. This setting currently only updates the UI choice and does not apply the theme.
              </p>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="space-y-4 p-4 border rounded-lg shadow-sm bg-card/50">
            <h3 className="text-xl font-semibold text-foreground flex items-center"><Bell className="mr-2 h-5 w-5 text-accent" />Notifications</h3>
            <div className="flex items-center justify-between space-x-2 py-2">
              <div>
                <Label htmlFor="notificationsEnabled" className="font-medium cursor-pointer">
                  Enable Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Receive updates and alerts from the application.</p>
              </div>
              <Switch
                id="notificationsEnabled"
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => handleSettingChange('notificationsEnabled', checked)}
                aria-label="Enable or disable notifications"
              />
            </div>
            {settings.notificationsEnabled && (
              <div className="space-y-3 pt-3 border-t mt-3">
                <Label className="font-medium">Email Update Frequency</Label>
                <RadioGroup 
                  value={settings.emailFrequency} 
                  onValueChange={(value) => handleSettingChange('emailFrequency', value)} 
                  className="flex flex-col sm:flex-row sm:gap-4"
                >
                  {['daily', 'weekly', 'never'].map(freq => (
                    <div key={freq} className="flex items-center space-x-2">
                      <RadioGroupItem value={freq} id={`freq-${freq}`} />
                      <Label htmlFor={`freq-${freq}`} className="capitalize cursor-pointer">{freq}</Label>
                    </div>
                  ))}
                </RadioGroup>
                 <p className="text-sm text-muted-foreground">
                  Control how often you receive email summaries (feature conceptual).
                </p>
              </div>
            )}
          </section>

          {/* Language & Region Section */}
           <section className="space-y-4 p-4 border rounded-lg shadow-sm bg-card/50">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <Globe className="mr-2 h-5 w-5 text-accent" />
              Language & Region
            </h3>
            <div className="space-y-2">
              <Label htmlFor="language-select">Preferred Language</Label>
              <Select 
                value={settings.language} 
                onValueChange={(value) => handleSettingChange('language', value)}
              >
                <SelectTrigger id="language-select" className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (United States)</SelectItem>
                  <SelectItem value="es">Español (España)</SelectItem>
                  <SelectItem value="fr">Français (France)</SelectItem>
                  <SelectItem value="de">Deutsch (Deutschland)</SelectItem>
                  <SelectItem value="ja">日本語 (日本)</SelectItem>
                </SelectContent>
              </Select>
               <p className="text-sm text-muted-foreground">
                  Choose the language for the application (feature conceptual).
                </p>
            </div>
          </section>
        </CardContent>
        <CardFooter className="flex justify-end pt-6">
          <Button onClick={handleSaveSettings} disabled={isLoading} className="min-w-[140px]">
            {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
