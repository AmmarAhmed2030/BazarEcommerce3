import React from 'react';
import BlogCard from './BlogCard';
import Link from 'next/link';

export default async function CommunityTrainings({ trainings, title }) {
  return (
    <section className="bg-white  dark:bg-slate-700 rounded-lg border-2   border-slate-200 dark:border-none">
      <div className=" mx-auto  max-w-7xl ">
        <div className="flex justify-between items-center p-4 px-5  rounded-t-lg bg-slate-200 border-b border-slate-200 dark:border-none dark:bg-slate-800 ">
          <h2 className=" font-bold text-xl text-slate-800 dark:text-slate-50">
            {title}
          </h2>
          {
            <Link
              href="/blogs"
              className="bg-lime-900 dark:bg-lime-600 dark:hover:bg-lime-600 hover:bg-lime-800  duration-300 transition-all text-slate-50  rounded-md px-4 py-2"
            >
              See All
            </Link>
          }
        </div>
        <div className="max-w-md mx-auto md:mx-0 px-5">
          <p className="mt-5 text-base font-normal leading-7  text-slate-800 dark:text-slate-50">
            Create custom landing pages with Rareblocks that converts more
            visitors than any website.
          </p>
        </div>

        <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none px-6 py-6 pb-10">
          {trainings.slice(0, 3).map((training, i) => (
            <BlogCard training={training} key={i} />
          ))}{' '}
        </div>
      </div>
    </section>
  );
}
