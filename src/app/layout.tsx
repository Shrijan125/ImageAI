import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import AuthProvider from '@/context/AuthProvider';
import { CreditsProvider } from '@/context/CreditsProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ImageAI',
  description:
    'Generate hyper-realistic AI photos in various themes and styles using your own face model. Perfect for avatars, campaigns, and creative expression.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <CreditsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              {children}
              <Toaster richColors></Toaster>
            </body>
          </ThemeProvider>
        </CreditsProvider>
      </AuthProvider>
    </html>
  );
}
