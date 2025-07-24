import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from './providers/redux-provider';

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
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
