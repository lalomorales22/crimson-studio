
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">Community Hub</CardTitle>
          </div>
          <CardDescription>
            Engage in discussions, share ideas, and connect with fellow Crimson Canvas users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The community forum/thread for all users to post and interact will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
