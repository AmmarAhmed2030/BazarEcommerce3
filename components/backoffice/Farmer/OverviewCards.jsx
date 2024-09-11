import React from 'react';
import { Component, BadgeDollarSign, Tally4, ChevronRight } from 'lucide-react';
import Link from 'next/link';
export default function OverviewCards({ sales, products }) {
  const productsCount = products.length.toString().padStart(2, '0');
  const salesCount = sales.length.toString().padStart(2, '0');
  const totalSales = sales.reduce((acc, item) => acc + item.total, 0);

  const analytics = [
    {
      title: 'Products',
      count: productsCount,
      unit: '',
      link: 'dashboard/products',
      icon: Component,
    },
    {
      title: 'Sales',
      count: salesCount,
      unit: '',
      link: 'dashboard/sales',
      icon: BadgeDollarSign,
    },
    {
      title: 'Total Revenue',
      count: totalSales,
      unit: '',
      link: 'dashboard/sales',
      icon: Tally4,
    },
  ];
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {analytics.map((item, i) => {
        return (
          <div
            key={i}
            className="rounded-lg dark:bg-slate-800 bg-slate-200 flex flex-col"
          >
            <div className="p-5 flex justify-between items-center border-b border-slate-200">
              <div className="flex flex-col gap-2">
                <h2 className="dark:text-white text-lime-600 uppercase font-semibold">
                  {item.title}
                </h2>
                <h2 className="dark:text-white text-lime-600 uppercase font-semibold">
                  {item.count}
                </h2>
              </div>
              <span className="p-2 rounded-full dark:bg-lime-600 bg-slate-800">
                <item.icon className="w-8 h-8 dark:text-white text-lime-600" />
              </span>
            </div>
            <div className="p-5 flex justify-between items-center">
              <Link href="#">View reports</Link>
              <ChevronRight />
            </div>
          </div>
        );
      })}
    </div>
  );
}
