import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Mushadelic Records - Admin Login`,
  description: `Acesso administrativo ao painel da Mushadelic Records`,
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
