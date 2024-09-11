import Breadcrumb from '@/components/frontend/Breadcrumb';
import CategoryCarousel from '@/components/frontend/CategoryCarousel';
import ProductDetails from '@/components/frontend/ProductDetails';
import { getData } from '@/lib/getData';
import React from 'react';

export default async function ProductDetailPage({ params: { id } }) {
  const product = await getData(`products/${id}`);

  const categoryId = product.categoryId;
  const category = await getData(`categories/${categoryId}`);
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-50">
      <Breadcrumb />
      <ProductDetails product={product} />
      <div className=" my-8 rounded-xl px-4">
        <h2 className="mb-4 text-2xl font-semibold  ml-3">Simillar Products</h2>
        {category.products.length > 0 && (
          <CategoryCarousel products={category.products} />
        )}
      </div>
    </div>
  );
}
