import DashboardCharts from '@/components/backoffice/DashboardCharts';
import FarmerDashboard from '@/components/backoffice/FarmerDashboard';
import Heading from '@/components/backoffice/Heading';
import LargeCards from '@/components/backoffice/LargeCards';
import SmallCards from '@/components/backoffice/SmallCards';
import UserDashboard from '@/components/backoffice/UserDashboard';
import DataTable from '@/components/data-table-components/DataTable';
import { authOptions } from '@/lib/authOptions';
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth';
import React from 'react';
import { columns } from './allOrders/columns';

export default async function page() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const sales = await getData('sales');
  const orders = await getData('orders');

  if (role === 'USER') {
    return <UserDashboard />;
  }
  if (role === 'FARMER') {
    return <FarmerDashboard />;
  }

  return (
    <div className="flex flex-col gap-4 text-slate-800 dark:text-slate-50 px-4 mx-auto max-w-[325px] xs:max-w-[480px] sm:max-w-[650px] md:max-w-[1000px]  lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-3xl 4xl:max-w-4xl 5xl:max-w-5xl 6xl:max-w-6xl  overflow-auto">
      <Heading title="Dashboad Overview" />
      <LargeCards sales={sales} />
      <SmallCards orders={orders} />

      <DashboardCharts sales={sales} />

      <div className="flex flex-col gap-6">
        <div className="py-8  rounded-lg shadow-lg ">
          <DataTable
            data={orders}
            columns={columns}
            filterKeys={['firstName', 'orderStatus']}
          />
        </div>
      </div>
    </div>
  );
}
