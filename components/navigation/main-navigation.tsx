"use client"

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/store/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/store/${params.storeId}`,
    },
    {
      href: `/store/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/store/${params.storeId}/billboards`,
    },
    {
      href: `/store/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/store/${params.storeId}/categories`,
    },
    {
      href: `/store/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/store/${params.storeId}/sizes`,
    },
    {
      href: `/store/${params.storeId}/colors`,
      label: 'Colors',
      active: pathname === `/store/${params.storeId}/colors`,
    },
    {
      href: `/store/${params.storeId}/products`,
      label: 'Products',
      active: pathname === `/store/${params.storeId}/products`,
    },
    {
      href: `/store/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/store/${params.storeId}/orders`,
    },
    {
      href: `/store/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/store/${params.storeId}/settings`,
    },
  ]
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {routes.map((route) => (
        <Link href={route.href} key={route.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${route.active? "text-black":"text-muted-foreground"}`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
