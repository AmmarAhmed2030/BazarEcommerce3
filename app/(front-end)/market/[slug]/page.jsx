import Breadcrumb from '@/components/frontend/Breadcrumb';
import CategoryList from '@/components/frontend/CategoryList';
import { getData } from '@/lib/getData';
import Image from 'next/image';
import React from 'react';

export default async function page({ params: { slug } }) {
  const market = await getData(`markets/details/${slug}`);
  const marketCategoryIds = market.categoryIds;
  console.log(marketCategoryIds);

  const allCategories = await getData('categories');
  const categories = allCategories.filter(
    (category) => category.products.length > 4,
  );
  const marketCategories = categories.filter((category) =>
    marketCategoryIds.includes(category.id),
  );
  return (
    <div className="px-4">
      <Breadcrumb />
      <div className="flex bg-white border border-gray-200 p-4 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 dark:text-slate-50 overflow-auto gap-6 items-center">
        <div className="">
          <Image
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover bg-white "
            src={market.logoUrl}
            alt={market.title}
          />
        </div>
        <div className="">
          <h2 className="py-4 text-base lg:text-4xl">{market.title}</h2>
          <p className="text-sm line-clamp-2 mb-4">{market.description}</p>
        </div>
      </div>

      <div className="flex flex-col py-8 gap-4 w-full">
        <div className="flex flex-col gap-8 h-full">
          {marketCategories.length > 0 ? (
            marketCategories.map((category, index) => {
              return (
                <div className="space-y-8" key={index}>
                  <CategoryList category={category} isMarket={true} />
                </div>
              );
            })
          ) : (
            <p className="flex justify-center items-center text-2xl py-[15%]">
              <span> No Categories Found For This Market 😙</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
