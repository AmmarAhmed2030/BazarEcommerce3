import Link from 'next/link';
import React from 'react';
import CategoryCarousel from './CategoryCarousel';

export default function CategoryList({ category, isMarket = false }) {
  return (
    <div className=" border border-slate-200  dark:border-slate-700 bg-white  rounded-lg dark:bg-slate-950  text-slate-800 dark:text-slate-50 overflow-hidden">
      <div className="bg-slate-100 dark:bg-slate-800 py-3 px-6 border-b border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 rounded-t-lg font-semibold flex justify-between items-center">
        <h2>{category?.title}</h2>

        <Link
          href={`/category/${category?.slug}`}
          className="bg-lime-900 dark:bg-lime-600 dark:hover:bg-lime-600 hover:bg-lime-800  duration-300 transition-all text-slate-50  rounded-md px-4 py-2"
        >
          See All
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-700 p-4">
        {category?.products?.length > 0 && (
          <CategoryCarousel products={category?.products} isMarket={isMarket} />
        )}
      </div>
    </div>
  );
}
