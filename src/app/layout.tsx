import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from './providers/redux-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from 'sonner';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'My Dashboard',
  description: 'A comprehensive analytics dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased font-roboto`}>
        <ReduxProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
              <div className="flex items-center gap-4 border-b border-border p-4">
                <SidebarTrigger />
                <h1 className="text-lg font-semibold">
                  My Analytics Dashboard
                </h1>
              </div>
              <div className="p-6 max-w-screen">{children}</div>
            </main>
            <Toaster />
          </SidebarProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
