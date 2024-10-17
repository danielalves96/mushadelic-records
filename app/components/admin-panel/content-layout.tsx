interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div>
      <div className="container mx-auto flex items-center justify-between">{children}</div>
    </div>
  );
}
