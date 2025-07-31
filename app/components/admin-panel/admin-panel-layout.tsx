'use client';

import { usePathname } from 'next/navigation';

import { Footer } from '@/components/admin-panel/footer';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { AdminNavbar } from './admin-navbar';
import { Navbar } from './navbar';

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (!sidebar) return null;

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <main className="min-h-[calc(100vh_-_200px)] bg-zinc-50 dark:bg-[#111318] ">{children}</main>
      <Footer />
    </>
  );
}
