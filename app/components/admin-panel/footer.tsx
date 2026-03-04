import Link from 'next/link';

export function Footer() {
  return (
    <footer className="z-20 w-full glass border-t border-white/5 mt-12">
      <div className="container mx-auto flex h-20 items-center justify-center md:justify-start px-4 sm:px-8">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-center">
          Developed by{' '}
          <Link
            href="https://kyantech.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Kyantech Solutions
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
