import { Metadata } from 'next';

import './globals.css';

import { Outfit } from 'next/font/google';
import { DataRefreshProvider } from 'providers/data-refresh-provider';
import SessionWrapper from 'providers/session-wrapper';
import { ThemeProvider } from 'providers/theme-provider';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Mushadelic Records`,
  description: `Psytrance Music Label`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} bg-background dark:bg-background`}>
        <DataRefreshProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SessionWrapper>{children}</SessionWrapper>
          </ThemeProvider>
        </DataRefreshProvider>
      </body>
    </html>
  );
}
