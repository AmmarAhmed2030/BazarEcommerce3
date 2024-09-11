import React from 'react';
import MarketsCarousel from './MarketsCarousel';
import { getData } from '@/lib/getData';

export default async function MarketList() {
  const markets = await getData('markets');
  return (
    <div className="text-white py-16">
      <div className="bg-slate-100 dark:bg-slate-700 p-4 border-2 border-gray-100 dark:border-gray-800 rounded-lg">
        <h2 className="py-2 text-center text-2xl text-slate-900 dark:text-slate-50 mb-4">
          Shop By Markets
        </h2>
        <MarketsCarousel markets={markets} />
      </div>
    </div>
  );
}
