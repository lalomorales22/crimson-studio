
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function EmailPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">Email Client</CardTitle>
          </div>
          <CardDescription>
            Manage your emails directly within the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A fully functional email client interface will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
