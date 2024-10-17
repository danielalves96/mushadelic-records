import Link from 'next/link';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type BreadCrumbProps = {
  items: {
    title: string;
    link?: string;
  }[];
};

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ items }) => {
  return (
    <Breadcrumb className="hidden sm:block font-medium">
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="text-sm">
              {item.link ? (
                <Link href={item.link}>{item.title}</Link>
              ) : (
                <BreadcrumbPage className="font-semibold">{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
