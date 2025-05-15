import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Mic, Film, MessageCircle, GalleryThumbnails, Code } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">Welcome to Crimson Canvas</h1>
        <p className="text-xl text-muted-foreground">
          Your AI-Powered Creative Suite. Unleash your creativity with our cutting-edge tools.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Sparkles className="h-8 w-8 text-accent" />}
          title="AI Text Generation"
          description="Craft compelling text snippets, articles, and notes with advanced AI models."
          link="/text-generation"
        />
        <FeatureCard
          icon={<Mic className="h-8 w-8 text-accent" />}
          title="AI Audio Studio"
          description="Transform text prompts into unique soundscapes and audio content."
          link="/audio-studio"
        />
        <FeatureCard
          icon={<Film className="h-8 w-8 text-accent" />}
          title="AI Video Toolkit"
          description="Generate engaging videos from text descriptions, images, or other videos."
          link="/video-toolkit"
        />
        <FeatureCard
          icon={<MessageCircle className="h-8 w-8 text-accent" />}
          title="AI Chatbot"
          description="Interact with an intelligent AI assistant for insights and conversations."
          link="/chatbot"
        />
        <FeatureCard
          icon={<GalleryThumbnails className="h-8 w-8 text-accent" />}
          title="Unified Gallery"
          description="Access and manage all your generated multimedia content in one place."
          link="/gallery"
        />
        <FeatureCard
          icon={<Code className="h-8 w-8 text-accent" />}
          title="Mini IDE Environment"
          description="Develop and test interactive software applications right in your browser."
          link="/ide"
        />
      </div>

      <footer className="text-center mt-16 text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Crimson Canvas. Powered by Firebase Studio.</p>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  return (
    <Card className="shadow-crimson hover:shadow-lg transition-shadow duration-300 border-border">
      <CardHeader className="items-center text-center">
        {icon}
        <CardTitle className="mt-2 text-2xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription>{description}</CardDescription>
        <Button asChild variant="link" className="mt-4 text-accent">
          <Link href={link}>Explore &rarr;</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
