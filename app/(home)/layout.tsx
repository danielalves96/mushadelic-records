export const metadata = {
  title: 'Mushadelic Festival',
  description: 'Winter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
