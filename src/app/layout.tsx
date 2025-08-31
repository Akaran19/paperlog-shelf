import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Paperlog - Academic Paper Tracker',
  description: 'Track, rate, and review academic papers like Goodreads for research.',
  keywords: 'academic papers, research, DOI, citations, paper tracker',
  authors: [{ name: 'Paperlog' }],
  metadataBase: new URL('https://paperlog.app'),
  openGraph: {
    title: 'Paperlog - Academic Paper Tracker',
    description: 'Track, rate, and review academic papers like Goodreads for research.',
    type: 'website',
    siteName: 'Paperlog'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paperlog - Academic Paper Tracker',
    description: 'Track, rate, and review academic papers like Goodreads for research.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://paperlog.app" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}