import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Menu } from '@/components/admin-panel/menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="md:mr-4" variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button className="flex justify-center items-center pb-2 pt-1" variant="link" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <SheetTitle className="font-bold text-lg">
                <Image src="/logo.png" alt="Mushadelic Records Logo" width={150} height={30} />
              </SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
