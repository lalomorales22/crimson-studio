
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BrainCircuit,
  GalleryThumbnails,
  Mic,
  Film,
  Code,
  Sparkles,
  Share2,
  MessagesSquare,
  Mail,
  MessageCircle,
  ShoppingCart,
  Users,
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
  { href: "/software-creator", label: "Software Creator", icon: BrainCircuit },
  { href: "/gallery", label: "Unified Gallery", icon: GalleryThumbnails },
  { href: "/ide", label: "Mini IDE", icon: Code },
  { type: "divider", key: "divMainFunctionalityEnd" }, 
  { href: "/social-posting", label: "Social Posting", icon: Share2 },
  { href: "/chat-rooms", label: "Chat Rooms", icon: MessagesSquare },
  { href: "/email", label: "Email", icon: Mail },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/shopping", label: "Shopping", icon: ShoppingCart },
  { href: "/community", label: "Community", icon: Users },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        if (item.type === "divider") {
          return (
            <div key={item.key} className="px-2 my-1 group-data-[collapsible=icon]:hidden">
              <hr className="border-sidebar-border" />
            </div>
          );
        }
        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href!} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href!))}
                className={cn(
                  "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href!))) &&
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
        );
      })}
    </SidebarMenu>
  );
}
