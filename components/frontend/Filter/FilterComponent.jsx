import React from 'react';
import Breadcrumb from './Breadcrumb';
import Sorting from './Sorting';
import Filters from './Filters';
import FilteredProducts from './FilteredProducts';

export default function FilterComponent({ category, products, totalLength }) {
  const { title, slug } = category;
  const productCount = category.products.length;
  return (
    <div className="flex flex-col gap-8 px-8 sm:px-16 md:px-10 lg:px-6 text-slate-800 dark:text-slate-50">
      <div className="flex flex-col gap-8">
        <Breadcrumb title={title} productCount={totalLength} />
        <Sorting title={title} slug={slug} isSearch={category?.isSearch} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-12 pb-8 gap-4">
        <div className="max-h-[500px] px-4 col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3 border rounded-lg border-slate-200 shadow-md">
          <Filters slug={slug} isSearch={category?.isSearch} />
        </div>
        <div className="col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-9">
          <FilteredProducts
            productCount={productCount}
            products={products}
            isSearch={category?.isSearch}
            totalLength={totalLength}
          />
        </div>
      </div>
    </div>
  );
}
