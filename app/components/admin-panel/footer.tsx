import Link from 'next/link';

export function Footer() {
  return (
    <div className="z-20 w-full bg-zinc-50 dark:bg-[#111318] backdrop-blur container mx-auto mt-6">
      <div className="flex h-16 items-center border-t-2 justify-center md:justify-start">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Developed by{' '}
          <Link
            href="https://kyantech.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Kyantech Solutions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
