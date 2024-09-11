'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export default function Sorting({ title, slug, isSearch }) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const min = searchParams.get('min') || 0;
  const max = searchParams.get('max');

  const search = searchParams.get('search') || '';

  const sortingLinks = [
    {
      title: 'Relevance',
      href: slug
        ? `/category/${slug}`
        : `/search?${search ? `search=${search}` : 'search='}`,
    },
    {
      title: 'Price - Hight to Low',
      href: slug
        ? `/category/${slug}?sort=desc`
        : `/search?${search ? `search=${search}` : 'search='}${min ? `&min=${min}` : `&min=${0}`}&sort=desc${max ? `&max=${max}` : ''}`,
    },
    {
      title: 'Price - Low to High',
      href: slug
        ? `/category/${slug}?sort=asc`
        : `/search?${search ? `search=${search}` : 'search='}${min ? `&min=${min}` : `&min=${0}`}&sort=asc${max ? `&max=${max}` : ''}`,
    },
  ];
  const actualPathname = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h2 className="text-2xl font-semibold">
        {isSearch && 'Search Results - '}
        {title}
      </h2>
      <div className="flex flex-wrap  justify-between gap-2 sm:flex-row sm:items-center sm:gap-3 text-sm">
        <p className="text-xl font-semibold">Sort by:</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {sortingLinks.map((link, i) => (
            <Link
              key={i}
              className={`${
                actualPathname === link.href
                  ? 'border border-slate-500 dark:bg-slate-800   bg-lime-600 text-slate-50 px-2 py-1 dark:text-lime-400'
                  : 'border border-slate-500 px-2 py-1 dark:text-slate-50 text-slate-800'
              }`}
              href={link.href}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
