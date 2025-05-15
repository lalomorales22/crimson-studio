"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LogOut, Settings, UserCircle } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar className="border-sidebar-border" collapsible="icon" variant="sidebar">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <h1 className="text-2xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              Crimson Canvas
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 mt-auto">
           <Separator className="my-2 bg-sidebar-border group-data-[collapsible=icon]:hidden" />
           <div className="group-data-[collapsible=icon]:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
                    <AvatarFallback>CC</AvatarFallback>
                  </Avatar>
                  <span>User Profile</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 bg-popover text-popover-foreground border-border shadow-crimson">
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-start mb-1">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start mb-1">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Separator className="my-1" />
                  <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
           </div>
           <div className="hidden group-data-[collapsible=icon]:block">
             <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>CC</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent side="right" align="center" className="w-56 bg-popover text-popover-foreground border-border shadow-crimson">
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-start mb-1">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                   <Button variant="ghost" className="w-full justify-start mb-1">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Separator className="my-1" />
                  <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
           </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 shadow-sm">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-xl font-semibold">Crimson Canvas</h2>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </SidebarInset>
      <SidebarRail />
    </SidebarProvider>
  );
}
