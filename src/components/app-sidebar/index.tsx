'use client';

import { BarChart3, FileText, Home } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user';
import Link from 'next/link';

const items = [
  {
    title: 'Main Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Report Page',
    url: '/reports',
    icon: FileText,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-warm text-brand-warm-foreground shadow-sm">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">My Dashboard</span>
            <span className="text-xs text-muted-foreground">Analytics Hub</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-brand-neutral/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-brand-light/50 data-[active=true]:bg-brand-warm/20 data-[active=true]:border-l-2 data-[active=true]:border-brand-warm"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
