import { Metadata } from 'next';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import AdminPanelLayout from '../components/admin-panel/admin-panel-layout';

export const metadata: Metadata = {
  title: `Mushadelic Records`,
  description: `Psytrance Music Label`,
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <AdminPanelLayout>
        <ContentLayout>{children}</ContentLayout>
      </AdminPanelLayout>
    </main>
  );
}
