import { LayoutGrid, LucideIcon } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/',
          label: 'RELEASES',
          active: pathname === '/',
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '/artists',
          label: 'ARTISTS',
          active: pathname.includes('/artists'),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '/demos',
          label: 'DEMOS',
          active: pathname.includes('/demos'),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '/contact',
          label: 'CONTACT',
          active: pathname.includes('/contact'),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
  ];
}
