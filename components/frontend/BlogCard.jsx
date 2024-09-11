import { convertIsoDateToNormal } from '@/lib/convertIsoDateToNormal';
import { getData } from '@/lib/getData';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function BlogCard({ training }) {
  const categoryId = training.categoryId;
  const category = await getData(`categories/${categoryId}`);
  const categoryTitle = category.title;

  const normalDate = convertIsoDateToNormal(training.createdAt);
  return (
    <div className="group">
      <div className="relative">
        <div className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl ">
          <Image
            className="object-cover w-full h-56 transition-all duration-200 transform group-hover:scale-110"
            src={training.imageUrl}
            alt={training.title}
            width={500}
            height={500}
          />
        </div>
        <span className="absolute px-3 py-2 text-xs font-bold tracking-widest text-gray-900 uppercase bg-white rounded left-3 top-3">
          {categoryTitle}
        </span>
      </div>
      <p className="mt-6 text-sm font-medium text-slate-800 dark:text-slate-50">
        {normalDate}
      </p>

      <Link
        href={`blogs/${training.slug}`}
        className="line-clamp-1 text-slate-800 dark:text-slate-50 py-5"
      >
        {training.title}
      </Link>

      <div className="mt-6">
        <Link
          href={`blogs/${training.slug}`}
          className="inline-flex items-center pb-2 text-xs font-bold tracking-widest  uppercase border-b border-slate-800 dark:border-slate-50  group text-slate-800 dark:text-slate-50"
        >
          Continue Reading
          <MoveRight className="w-4 h-4 ml-2 transition-all duration-200 transform group-hover:translate-x-1 text-slate-800 dark:text-slate-50" />
        </Link>
      </div>
    </div>
  );
}
