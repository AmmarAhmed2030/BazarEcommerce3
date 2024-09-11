'use client';

import {
  BadgeDollarSign,
  Boxes,
  Building2,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  LayoutList,
  ListOrdered,
  LogOut,
  MonitorPlay,
  Slack,
  Target,
  Users,
  Users2,
  Warehouse,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarVisibility } from '@/redux/slices/sidebarSlice';

export default function Sidebar({ session }) {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const setVisibility = () => dispatch(setSidebarVisibility(false));
  const [openMenu, setOpenMenu] = useState(false);

  const pathname = usePathname();

  const router = useRouter();
  const role = session?.user?.role;
  const userStatus = session?.user?.status;
  let sidebarLinks = [
    {
      title: 'Customers',
      icon: Users2,

      href: '/dashboard/customers',
    },
    {
      title: 'Markets',
      icon: Warehouse,
      href: '/dashboard/markets',
    },
    {
      title: 'Farmers',
      icon: Users,
      href: '/dashboard/farmers',
    },

    {
      title: 'Orders',
      icon: ListOrdered,
      href: '/dashboard/allOrders',
    },
    {
      title: 'Sales',
      icon: BadgeDollarSign,
      href: '/dashboard/sales',
    },

    {
      title: 'Bazar Community',
      icon: Building2,
      href: '/dashboard/community',
    },
    {
      title: 'Online Store',
      icon: Target,
      href: '/',
    },
  ];
  let catalogueLinks = [
    {
      title: 'Products',
      icon: Boxes,
      href: '/dashboard/products',
    },
    {
      title: 'Catageories',
      icon: LayoutList,
      href: '/dashboard/categories',
    },

    {
      title: 'Store Banners',
      icon: MonitorPlay,
      href: '/dashboard/banners',
    },
  ];
  if (role === 'FARMER') {
    if (userStatus) {
      sidebarLinks = [
        {
          title: 'Sales',
          icon: BadgeDollarSign,
          href: '/dashboard/sales',
        },

        {
          title: 'Online Store',
          icon: Target,
          href: '/',
        },
      ];
      catalogueLinks = [
        {
          title: 'Products',
          icon: Boxes,
          href: '/dashboard/products',
        },
      ];
    } else {
      sidebarLinks = [];
      catalogueLinks = [];
    }
  }

  async function handleLogout() {
    try {
      await signOut();

      router.push('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  }
  return (
    <div
      className={
        showSidebar
          ? 'mt-20  z-50 bg-white dark:bg-slate-800 space-y-6 w-64  h-screen text-slate-800 shadow-md dark:text-slate-100  fixed left-0 top-0 overflow-y-auto'
          : 'hidden  mt-20  bg-white dark:bg-slate-800 space-y-6 w-64  h-screen text-slate-800 shadow-md dark:text-slate-100  fixed left-0 top-0 overflow-y-auto'
      }
    >
      <div className="space-y-4 flex flex-col">
        <Link
          onClick={setVisibility}
          href="/dashboard"
          className={
            '/dashboard' === pathname
              ? 'flex items-center space-x-3 border-l-8  px-6 py-2 border-lime-600 dark:text-lime-600'
              : 'flex items-center space-x-3  px-6 py-2   '
          }
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>

        {catalogueLinks.length > 0 && (
          <Collapsible className="px-6">
            <CollapsibleTrigger onClick={() => setOpenMenu(false)}>
              <div className="flex items-center space-x-6 py-2">
                <div className="flex items-center space-x-3">
                  <Slack />
                  <span>Catalogue</span>
                </div>
                {openMenu ? <ChevronDown /> : <ChevronRight />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pl-6 py-3 dark:bg-slate-800 rounded-lg">
              {catalogueLinks.map((item, index) => {
                return (
                  <Link
                    onClick={setVisibility}
                    key={index}
                    href={item.href}
                    className={
                      item.href === pathname
                        ? 'flex items-center space-x-3 py-1 text-sm text-lime-600'
                        : 'flex items-center space-x-3 py-1'
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        )}

        {sidebarLinks.map((item, index) => {
          return (
            <Link
              onClick={setVisibility}
              key={index}
              href={item.href}
              className={
                item.href === pathname
                  ? 'flex items-center space-x-3 border-l-8  px-6 py-2 border-lime-600 dark:text-lime-600'
                  : 'flex items-center space-x-3  px-6 py-2   '
              }
            >
              <item.icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
        <div className="px-4 pb-4">
          <button
            onClick={handleLogout}
            className="bg-lime-600 text-white flex rounded-md px-12 py-3 "
          >
            <LogOut />
            <span className="tracking-wide font-semibold px-2">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
