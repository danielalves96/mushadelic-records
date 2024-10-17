'use client';

import { Footer } from '@/components/admin-panel/footer';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { Navbar } from './navbar';

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh_-_170px)] bg-zinc-50 dark:bg-[#111318] ">{children}</main>
      <Footer />
    </>
  );
}
