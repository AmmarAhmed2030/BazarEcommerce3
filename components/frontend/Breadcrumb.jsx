'use client';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathArr = pathname.split('/').filter(Boolean); // Remove empty strings

  return (
    <nav className="flex mb-6 px-12 xl:px-0" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center capitalize">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white"
          >
            <Home className="w-3 h-3 me-2.5" />
            Home
          </Link>
        </li>
        {pathArr.map((item, i) => {
          // Determine the path for each breadcrumb
          const href = `/${pathArr.slice(0, i + 1).join('/')}`;
          const isLast = i === pathArr.length - 1;

          return (
            <li key={i}>
              <div className="flex items-center">
                <ChevronRight className="w-3 h-3 text-slate-400" />
                {isLast ? (
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-400 w-[70px] line-clamp-1">
                    {item.replace(/-/g, ' ')}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white w-[70px] line-clamp-1"
                  >
                    {item.replace(/-/g, ' ')}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
