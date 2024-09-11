import FormHeader from '@/components/backoffice/FormHeader';
import NewMarketForm from '@/components/backoffice/Forms/NewMarketForm';
import { getData } from '@/lib/getData';
import React from 'react';

export default async function NewMarket() {
  const categoriesData = await getData('categories');

  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  console.log(categoriesData);
  return (
    <div>
      <FormHeader title="New Market" />
      <NewMarketForm categories={categories} />
    </div>
  );
}
