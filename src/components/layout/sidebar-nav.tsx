"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  MessageCircle,
  GalleryThumbnails,
  Mic,
  Film,
  Code,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/text-generation", label: "Text Generation", icon: Sparkles },
  { href: "/audio-studio", label: "Audio Studio", icon: Mic },
  { href: "/video-toolkit", label: "Video Toolkit", icon: Film },
  { href: "/chatbot", label: "AI Chatbot", icon: MessageCircle },
  { href: "/gallery", label: "Unified Gallery", icon: GalleryThumbnails },
  { href: "/ide", label: "Mini IDE", icon: Code },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              className={cn(
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                pathname === item.href &&
                  "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
              )}
              tooltip={{ children: item.label, className: "bg-popover text-popover-foreground border-border shadow-crimson" }}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
