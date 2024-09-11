import React from 'react';
import { authOptions } from '@/lib/authOptions';
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth';
import OrderCard from '@/components/Order/OrderCard';
import Image from 'next/image';
import Link from 'next/link';

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session?.user?.id;
  const orders = await getData(`orders/user/${userId}`);

  if (orders.length === 0 || !orders) {
    return (
      <div className="flex-col justify-center items-center space-y-4 text-slate-800 dark:text-slate-50 text-center">
        <span className="text-xl">
          No Orders Yet ➡️
          <Link
            href="/"
            className="hover:text-lime-500 dark:hover:text-lime-500 px-4"
          >
            Order Now 🧑‍🚀
          </Link>
        </span>
        <Image
          src="/order-now/orderNow.jpg"
          width={1000}
          height={1000}
          className="mx-auto w-[400px] h-[400px]"
          alt="order now image"
        />
      </div>
    );
  }
  console.log(orders);
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20 dark:bg-slate-950 dark:text-slate-50 text-slate-800">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold  sm:text-3xl">Orders Details</h1>
            <p className="mt-2 text-sm font-normal ">
              Check the status of recent and old orders & discover more products
            </p>
          </div>

          <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
            {orders.length > 0 &&
              orders.map((order, index) => (
                <OrderCard order={order} key={index} />
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
