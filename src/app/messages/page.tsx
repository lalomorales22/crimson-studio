
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">Direct Messages</CardTitle>
          </div>
          <CardDescription>
            Send and receive messages across various platforms and contacts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            An integrated messaging client for various platforms (phone numbers, etc.) will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
