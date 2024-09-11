import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function SidebarCategories({ categories }) {
  return (
    <div className="lg:col-span-3 bg-white border  rounded-lg dark:bg-slate-700  text-slate-800 dark:text-slate-50 ">
      <h2 className="bg-slate-100 dark:bg-slate-800 py-3 px-6 border-b border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 rounded-t-lg font-semibold  ">
        Shop By Category ({categories.length})
      </h2>
      <div className="py-4 px-6 h-[280px] overflow-y-auto flex flex-col gap-2">
        {categories.map((category, index) => (
          <Link
            href={`/category/${category.slug}`}
            key={index}
            className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 duration-500 transition-all rounded-l-full rounded-r-lg"
          >
            <Image
              src={category.imageUrl}
              width={556}
              height={556}
              alt={category.title}
              className="rounded-full w-14 h-14 object-cover border border-green-400"
            />
            <span className="text-sm">{category.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
