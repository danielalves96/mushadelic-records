interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div>
      <div className="container mx-auto  py-6">{children}</div>
    </div>
  );
}
