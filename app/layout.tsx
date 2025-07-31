import { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';
import SessionWrapper from 'providers/session-wrapper';
import TanstackProvider from 'providers/tanstack-provider';
import { ThemeProvider } from 'providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Mushadelic Records`,
  description: `Psytrance Music Label`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-50 dark:bg-[#111318]`}>
        <TanstackProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SessionWrapper>{children}</SessionWrapper>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
