import FilterComponent from '@/components/frontend/Filter/FilterComponent';
import { getData } from '@/lib/getData';
import React from 'react';

export default async function Search({ searchParams }) {
  const { search, max, min, sort, page } = searchParams;

  const { products, totalLength } = await getData(
    `products/search?${search && `search=${search}`}${sort ? `&sort=${sort}` : `&sort=asc`}${min ? `&min=${min}` : `&min=0`}${max ? `&max=${max}` : ''}${page ? `&page=${page}` : ''}`,
  );
  console.log(products);
  const category = {
    title: search,
    slug: '',
    products,
    totalLength,
    isSearch: true,
  };
  return (
    <div>
      <FilterComponent
        isSearch={true}
        category={category}
        products={products}
        totalLength={totalLength}
      />
    </div>
  );
}
