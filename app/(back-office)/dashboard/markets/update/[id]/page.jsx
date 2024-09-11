import FormHeader from '@/components/backoffice/FormHeader';
import NewMarketForm from '@/components/backoffice/Forms/NewMarketForm';
import { getData } from '@/lib/getData';
import React from 'react';

export default async function NewMarket({ params: { id } }) {
  const categoriesData = await getData('/categories');

  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  console.log(categoriesData);
  const market = await getData(`/markets/${id}`);
  return (
    <div>
      <FormHeader title="Update Market" />
      <NewMarketForm categories={categories} updateData={market} />
    </div>
  );
}
