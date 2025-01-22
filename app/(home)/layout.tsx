import { Metadata } from 'next';

import '../globals.css';

import { Inter } from 'next/font/google';
import TanstackProvider from 'providers/tanstack-provider';
import { ThemeProvider } from 'providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Mushadelic Festival`,
  description: `Winter Edition`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-50 dark:bg-[#111318]`}>
        <TanstackProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <main>{children}</main>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
