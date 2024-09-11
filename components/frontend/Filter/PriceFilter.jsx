'use client';
import { Circle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import React from 'react';
import { useForm } from 'react-hook-form';

export default function PriceFilter({ slug, isSearch }) {
  const searchParams = useSearchParams();
  const minParam = searchParams.get('min') || 0;
  const maxParam = searchParams.get('max');
  const sort = searchParams.get('sort') || 'asc';
  const search = searchParams.get('search') || '';

  const priceRanges = [
    {
      display: 'Under 200',
      max: 200,
    },
    {
      display: 'Between 200 and 400',
      max: 400,
      min: 200,
    },
    {
      display: 'Between 400 and 600',
      max: 600,
      min: 400,
    },
    {
      display: 'Above 600',
      min: 600,
    },
  ];
  const router = useRouter();

  const { handleSubmit, register, reset } = useForm();
  function onSubmit(data) {
    const { min, max } = data;
    if (!search) {
      if (min && max) {
        router.push(`/category/${slug}?sort=asc&min=${min}&max=${max}`);

        reset();
      } else if (min) {
        router.push(`/category/${slug}?sort=asc&min=${min}`);
        reset();
      } else if (max) {
        router.push(`/category/${slug}?sort=asc&max=${max}`);
        reset();
      }
    } else if (search) {
      router.push(
        `/search?${search ? `search=${search}` : 'search='}&sort=asc${min ? `&min=${min}` : `&min=${0}`}${max ? `&max=${max}` : ''}`,
      );
      reset();
    }
  }
  return (
    <div className="px-2 py-5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Price</h2>
          <Link
            href={
              search
                ? `/search?${search ? `search=${search}` : 'search='}`
                : `/category/${slug}?sort=asc`
            }
            className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-3 py-2.5 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800 "
          >
            Reset
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {priceRanges.map((range, i) => (
            <Link
              key={i}
              href={
                isSearch
                  ? `?${new URLSearchParams({ search, sort, min: range.min || 0, max: range.max || '' })}`
                  : `?${new URLSearchParams({ sort, min: range.min || 0, max: range.max || '' })}`
              }
              className={`${
                (range.min && range.min == minParam) ||
                (range.max && range.max == maxParam) ||
                (range.min &&
                  range.max &&
                  range.min == minParam &&
                  range.max == maxParam)
                  ? 'flex gap-2 items-center text-lime-500'
                  : 'flex gap-2 items-center'
              }`}
            >
              <Circle className="w-4 h-4 flex-shrink-0" />
              {range.display}
            </Link>
          ))}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 my-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="col-span-1">
            <input
              {...register('min')}
              type="number"
              id="cvv-input"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              placeholder="min"
            />
          </div>
          <div className="col-span-1">
            <input
              {...register('max')}
              type="number"
              id="cvv-input"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              placeholder="max"
            />
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800"
            >
              Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
