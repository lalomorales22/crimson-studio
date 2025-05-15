
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function ShoppingPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">Marketplace</CardTitle>
          </div>
          <CardDescription>
            Discover products from other users or list your own items for sale.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The shopping marketplace, allowing users to browse and post items for sale, will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
