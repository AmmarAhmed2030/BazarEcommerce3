import React from 'react';
import Product from '../Product';
import Paginate from './Paginate';
export default async function FilteredProducts({
  products = [],
  productCount,
  isSearch,
  totalLenght,
}) {
  return (
    <div className="flex justify-center flex-col">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <Product product={product} key={i} />
          ))}{' '}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4 h-[400px]">
          <p className="text-3xl py-20">No Products Found 😕</p>
        </div>
      )}
      {productCount > 0 && (
        <div className="p-8">
          <Paginate totalPages={totalLenght} isSearch={isSearch} />
        </div>
      )}
    </div>
  );
}
