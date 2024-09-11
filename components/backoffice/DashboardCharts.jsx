import React from 'react';
import WeeklySalesChart from './WeeklySalesChart';
import BestSellingProductsChart from './BestSellingProductsChart';

export default function DashboardCharts({ sales }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <WeeklySalesChart sales={sales} />
      <BestSellingProductsChart />
    </div>
  );
}
