import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SheetMenu } from '@/components/admin-panel/sheet-menu';
import { getMenuList } from '@/lib/menu-list';

export function Navbar() {
  const pathname = usePathname();
  const menuList = getMenuList(pathname).flatMap((group) => group.menus);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5 px-4 sm:px-8">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <div className="flex items-center lg:space-x-0 w-full md:w-fit md:items-start">
          <SheetMenu />
          <div className="flex justify-center w-full">
            <Image src="/logo.png" alt="Mushadelic Records Logo" width={180} height={30} className="drop-shadow-lg" />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="hidden md:flex space-x-6">
            {menuList.map((menu) => (
              <Link key={menu.href} href={menu.href} className="group cursor-pointer">
                <span
                  className={`transition-colors duration-300 ${menu.active ? 'font-bold text-primary text-sm' : 'text-sm text-muted-foreground group-hover:text-foreground'}`}
                >
                  {menu.label}
                </span>
              </Link>
            ))}
          </div>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </header>
  );
}
