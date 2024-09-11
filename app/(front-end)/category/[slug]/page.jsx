import FilterComponent from '@/components/frontend/Filter/FilterComponent';
import { getData } from '@/lib/getData';
import React from 'react';

export default async function page({ params: { slug }, searchParams }) {
  const { sort = 'asc', max = '', min = 0, page } = searchParams;

  const category = await getData(`categories/filter/${slug}`);

  let products = await getData(
    `products/category?catId=${category.id}${`&sort=${sort}`}${`&min=${min}`}${`&max=${max}`}${page ? `&page=${page}` : ''}`,
  );

  return (
    <div>
      <FilterComponent category={category} products={products} />
    </div>
  );
}
