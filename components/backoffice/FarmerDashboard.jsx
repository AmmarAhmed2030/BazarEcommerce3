import { authOptions } from '@/lib/authOptions';
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth';
import React from 'react';
import OverviewCards from './Farmer/OverviewCards';
import { Info } from 'lucide-react';

export default async function FarmerDashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { id, status = false } = user;
  const sales = await getData('sales');
  const salesById = sales.filter((sale) => sale.vendorId === id);
  const products = await getData('products');
  const productsById = products.filter((product) => product.userId === id);
  if (!status) {
    return (
      <div className="max-w-2xl mx-auto min-h-screen mt-8 ">
        <div
          id="alert-additional-content-1"
          className="p-4 mb-4 text-lime-800 border border-lime-300 rounded-lg bg-lime-50 dark:bg-slate-800 dark:text-lime-400 dark:border-lime-800"
          role="alert"
        >
          <div className="flex items-center">
            <Info className="flex-shrink-0 w-4 h-4 me-2" />
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Account Under Review</h3>
          </div>
          <div className="my-2 text-sm  py-4 ">
            Your account details are currently under review. Please note thatit
            may take 24-48hours for approval. Thank you for your patience.
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <OverviewCards sales={salesById} products={productsById} />
      </div>
    </div>
  );
}
