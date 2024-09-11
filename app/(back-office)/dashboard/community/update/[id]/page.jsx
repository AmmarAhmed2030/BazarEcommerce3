import FormHeader from '@/components/backoffice/FormHeader';
import NewTrainingForm from '@/components/backoffice/Forms/NewTrainingForm';

import { getData } from '@/lib/getData';
import React from 'react';

export default async function NewTraining({ params: { id } }) {
  const categoriesData = await getData('categories');

  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  console.log(categoriesData);
  const training = await getData(`/trainings/${id}`);
  return (
    <div>
      <FormHeader title="Update Training" />
      <NewTrainingForm categories={categories} updateData={training} />;
    </div>
  );
}
