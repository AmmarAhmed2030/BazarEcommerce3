import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HeroCarousel from './HeroCarousel';
import { CircleDollarSign, FolderSync, HelpCircle } from 'lucide-react';
import SidebarCategories from './SidebarCategories';
import { getData } from '@/lib/getData';

export default async function Hero({ categories }) {
  const banners = await getData('banners');
  return (
    <div className="grid grid-cols-1  lg:grid-cols-12 gap-4 ">
      <SidebarCategories categories={categories} />
      <div className="rounded-md w-full lg:col-span-6">
        <HeroCarousel banners={banners} />
      </div>
      <div className="md:gap-4 justify-between lg:col-span-3 flex flex-wrap py-3 px-3 rounded-lg   dark:bg-slate-700 border  w-full text-slate-800 dark:text-slate-50">
        <div className="flex flex-col gap-2">
          <Link href="#" className="flex space-x-1 mb-3 items-center">
            <HelpCircle className="shrink-0 w-5 h-5 text-slate-900 dark:text-lime-500" />
            <div className="flex flex-col">
              <h2 className="uppercase ">Help Center</h2>
              <p className="text-[0.6rem]">Guide to Customer Care</p>
            </div>
          </Link>
          <Link href="#" className="flex space-x-1 mb-3 items-center">
            <FolderSync className="shrink-0 w-5 h-5 text-slate-900 dark:text-lime-500" />
            <div className="flex flex-col">
              <h2 className="uppercase ">Easy Return </h2>
              <p className="text-[0.6rem]">Quick Return</p>
            </div>
          </Link>
          <Link
            href="/register-farmer"
            className="flex space-x-1 items-center mb-6"
          >
            <CircleDollarSign className="shrink-0 w-5 h-5 text-slate-900 dark:text-lime-500" />
            <div className="flex flex-col">
              <h2 className="uppercase ">Sell On Bazar</h2>
              <p className="text-[0.6rem]">Millions of Visitors</p>
            </div>
          </Link>
        </div>
        <div className="mx-auto md:mx-0">
          {' '}
          <Image
            src="/Ads/ad1.gif"
            alt="advertise"
            className="md:w-[400px] w-[450px] h-[150px] rounded-lg"
            width={1000}
            height={1000}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
