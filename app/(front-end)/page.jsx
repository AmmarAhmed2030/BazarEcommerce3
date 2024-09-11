import React from 'react';
import Hero from '@/components/frontend/Hero';
import MarketList from '@/components/frontend/MarketList';
import CategoryList from '@/components/frontend/CategoryList';
import CommunityTrainings from '@/components/frontend/CommunityTrainings';
import { getData } from '@/lib/getData';

export default async function Home() {
  let categoriesData = [];
  categoriesData = await getData('categories');
  const trainings = await getData('trainings');
  console.log(categoriesData);
  const categories = categoriesData.filter(
    (category) => category.products.length > 4,
  );
  //const isLoading = useSelector(store=>store.loading)
  return (
    <div className="min-h-screen flex flex-col gap-4 px-4 ">
      <Hero categories={categories} />
      <MarketList />
      {categories.map((category, index) => {
        return <CategoryList key={index} category={category} />;
      })}

      <CommunityTrainings
        trainings={trainings.slice(0, 3)}
        title="Read Featured  Trainings"
      />
    </div>
  );
}
