import { Metadata } from 'next';

import '../globals.css';

import { Inter } from 'next/font/google';
import TanstackProvider from 'providers/tanstack-provider';
import { ThemeProvider } from 'providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Mushadelic Records - Admin Login`,
  description: `Acesso administrativo ao painel da Mushadelic Records`,
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-50 dark:bg-[#111318]`}>
        <TanstackProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
