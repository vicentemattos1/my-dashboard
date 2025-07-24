'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React, { ReactNode, useEffect } from 'react';
import { Toaster } from 'sonner';
import { useUser } from '../store/slices/userSlice';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthProviderProps) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="flex items-center gap-4 border-b border-border p-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">My Analytics Dashboard</h1>
        </div>
        <div className="p-6 max-w-screen">{children}</div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
