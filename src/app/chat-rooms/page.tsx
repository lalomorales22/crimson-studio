
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessagesSquare } from "lucide-react";

export default function ChatRoomsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <MessagesSquare className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">Chat Rooms</CardTitle>
          </div>
          <CardDescription>
            Join and create chat rooms on various topics. Connect with the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Chat Rooms interface, featuring a sidebar for categories, a list of chat rooms, and the main chat window, will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
