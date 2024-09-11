import CategoryList from '@/components/frontend/CategoryList';
import RecentTrainings from '@/components/frontend/RecentTrainings';
import TrainingHtml from '@/components/TrainingHtml';
import { convertIsoDateToNormal } from '@/lib/convertIsoDateToNormal';
import { getData } from '@/lib/getData';
import Image from 'next/image';
import React from 'react';

export default async function page({ params: { slug } }) {
  const training = await getData(`trainings/training/${slug}`);
  const trainingId = training.id;
  const categoryId = training.categoryId;
  const category = await getData(`categories/${categoryId}`);
  const normalDate = convertIsoDateToNormal(training.createdAt);
  const allTrainings = await getData('trainings');
  const recentTrainings = allTrainings.filter(
    (training) => training.id !== trainingId,
  );
  return (
    <>
      <section className="py-12 mx-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 text-slate-800 dark:text-slate-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-7 lg:gap-x-12">
            <div className=" lg:col-span-5 rounded-xl text-slate-800 dark:text-slate-50 bg-white dark:bg-slate-700">
              <div className="px-4">
                <div className="mx-auto ">
                  <div className="max-w-3xl mx-auto">
                    <p className="text-base font-medium ">{normalDate}</p>
                    <h1 className="mt-6 text-4xl font-bold  ">
                      {training.title}
                    </h1>
                  </div>
                  <div className="mt-12 sm:mt-16 aspect-w-16 aspect-h-9 lg:aspect-h-6">
                    <Image
                      width={3000}
                      height={3000}
                      className="object-cover w-full h-96"
                      src={training.imageUrl}
                      alt={training.title}
                    />
                  </div>
                  <div className="py-8">
                    <p className="text-lg  py-5">{training.description}</p>
                    <hr />
                    <div className="py-8">
                      {' '}
                      <TrainingHtml content={training.content} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <RecentTrainings recentTrainings={recentTrainings} />
          </div>
        </div>
      </section>
      <div className="py-8 px-4">
        <CategoryList category={category} />
      </div>
    </>
  );
}
