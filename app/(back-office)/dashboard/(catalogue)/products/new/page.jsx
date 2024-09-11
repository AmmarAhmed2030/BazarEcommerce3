import FormHeader from '@/components/backoffice/FormHeader';
import NewProductForm from '@/components/backoffice/Forms/NewProductForm';
import { getData } from '@/lib/getData';
import React from 'react';

export default async function NewProduct() {
  const categoriesData = await getData('categories');
  const usersData = await getData('users');
  const farmersData = usersData.filter((user) => user.role === 'FARMER');
  const farmers = farmersData.map((farmer) => {
    return {
      id: farmer.id,
      title: farmer.name,
    };
  });
  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  console.log(categoriesData);
  return (
    <div>
      <FormHeader title="New Product" />
      <NewProductForm categories={categories} farmers={farmers} />;
    </div>
  );
}
