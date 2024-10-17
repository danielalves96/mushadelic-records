import { Metadata } from 'next';

import '../globals.css';

import { Inter } from 'next/font/google';
import TanstackProvider from 'providers/tanstack-provider';
import { ThemeProvider } from 'providers/theme-provider';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import AdminPanelLayout from '../components/admin-panel/admin-panel-layout';

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
            <main className="min-h-screen">
              <AdminPanelLayout>
                <ContentLayout>{children}</ContentLayout>
              </AdminPanelLayout>
            </main>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
