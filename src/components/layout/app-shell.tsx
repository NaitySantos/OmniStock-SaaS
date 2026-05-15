
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ArrowLeftRight, History, Bell, ShoppingCart } from "lucide-react"
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { UnitSwitcher } from "./unit-switcher"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import imagesData from "@/app/lib/placeholder-images.json"

const navigation = [
  { name: "Painel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Estoque", href: "/inventory", icon: Package },
  { name: "Loja", href: "/store", icon: ShoppingCart },
  { name: "Transferências", href: "/transfers", icon: ArrowLeftRight },
  { name: "Auditoria", href: "/audit", icon: History },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const adminAvatar = imagesData.placeholderImages.find(img => img.id === "admin-avatar")
  const platformLogo = imagesData.placeholderImages.find(img => img.id === "platform-logo")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-hidden">
        <Sidebar className="border-r">
          <SidebarHeader className="flex flex-col items-center pt-12 pb-8 px-4">
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative h-20 w-20 rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 bg-primary/10 border border-primary/20 transition-transform hover:scale-105 duration-300">
                {platformLogo && (
                  <Image 
                    src={platformLogo.imageUrl} 
                    alt="Logo" 
                    fill 
                    className="object-cover"
                    data-ai-hint={platformLogo.imageHint}
                    priority
                  />
                )}
              </div>
              <span className="font-headline text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center tracking-tight">
                OmniStock
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <div className="mb-6 px-2">
              <UnitSwitcher />
            </div>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <div className="flex items-center gap-3 px-2">
              <Avatar className="h-10 w-10 border border-primary/20">
                <AvatarImage 
                  src={adminAvatar?.imageUrl} 
                  alt="Admin"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">Admin</span>
                <span className="text-[10px] text-muted-foreground uppercase font-mono-data">Gestor Global</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="h-20 flex items-center justify-between px-8 border-b bg-card/30 backdrop-blur sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="font-headline text-xl font-bold">
                {navigation.find(n => n.href === pathname)?.name || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
