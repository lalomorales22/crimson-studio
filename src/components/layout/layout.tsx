
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LogOut, Settings, UserCircle, LayoutGrid } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-screen-xl h-[calc(100vh-theme(spacing.16))] rounded-2xl shadow-2xl overflow-hidden flex bg-background">
        <SidebarProvider defaultOpen>
          <Sidebar className="border-sidebar-border" collapsible="icon" variant="floating">
            <SidebarHeader className="p-4">
              <Link href="/" className="flex items-center gap-2.5">
                <LayoutGrid className="w-7 h-7 text-primary" />
                <h1 className="text-2xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                  Crimson Canvas
                </h1>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
              <SidebarNav />
            </SidebarContent>
            <SidebarFooter className="p-2 mt-auto">
              <SidebarSeparator className="my-2 group-data-[collapsible=icon]:hidden" />
              <div className="group-data-[collapsible=icon]:hidden p-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2 h-auto">
                      <Avatar className="h-9 w-9 mr-2.5">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
                        <AvatarFallback>CC</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Demo User</span>
                        <span className="text-xs text-sidebar-foreground/70">demo.user@example.com</span>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="start" className="w-60 bg-popover text-popover-foreground border-border shadow-crimson ml-1 mb-1">
                    <div className="p-1">
                      <Button variant="ghost" className="w-full justify-start mb-1 text-sm h-9" asChild>
                        <Link href="/profile">
                          <UserCircle className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start mb-1 text-sm h-9" asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </Button>
                      <SidebarSeparator className="my-1.5" />
                      <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive text-sm h-9">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="hidden group-data-[collapsible=icon]:flex justify-center p-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
                      <AvatarFallback>CC</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent side="right" align="center" className="w-60 bg-popover text-popover-foreground border-border shadow-crimson ml-1">
                    <div className="p-1">
                      <Button variant="ghost" className="w-full justify-start mb-1 text-sm h-9" asChild>
                        <Link href="/profile">
                          <UserCircle className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start mb-1 text-sm h-9" asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </Button>
                      <SidebarSeparator className="my-1.5" />
                      <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive text-sm h-9">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex flex-col"> {/* This will use the bg-background from the parent .dark-red-window */}
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 shadow-sm">
              <SidebarTrigger className="md:hidden" />
            </header>
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </SidebarInset>
          <SidebarRail />
        </SidebarProvider>
      </div>
    </div>
  );
}
