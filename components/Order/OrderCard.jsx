import { convertIsoDateToNormal } from '@/lib/convertIsoDateToNormal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function OrderCard({ order }) {
  const orderItems = order.orderItems;
  let subTotal;
  if (orderItems.length === 0 || !orderItems) {
    subTotal = 0;
  }

  subTotal = orderItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  return (
    <li className="overflow-hidden bg-white  border border-slate-200 rounded-md">
      <div className="lg:flex">
        <div className="w-full border-b border-slate-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-50">
          <div className="px-4 py-6 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
              <div>
                <p className="text-sm font-medium ">Order Number</p>
                <p className="text-sm font-bold  mt-0.5">
                  #{order?.orderNumber}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium ">Date</p>
                <p className="text-sm font-bold  mt-0.5">
                  {convertIsoDateToNormal(order?.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium ">Total Amount</p>
                <p className="text-sm font-bold  mt-0.5">${subTotal}</p>
              </div>

              <div>
                <p className="text-sm font-medium ">Order Status</p>
                <div className="mt-0.5 flex items-center">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-amber-400 mr-1.5">
                    <svg
                      className="w-2 h-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-bold ">
                    {' '}
                    {order?.orderStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8 dark:bg-slate-600 text-slate-800 dark:text-slate-50">
          <ul className="space-y-7">
            {order?.orderItems.length === 0 || !order?.orderItems ? (
              <p>No Items Yet</p>
            ) : (
              order.orderItems.map((item, index) => (
                <li
                  className="flex flex-col md:flex-row bg-white dark:bg-slate-600 rounded-lg overflow-hidden shadow-lg p-4"
                  key={index}
                >
                  <Image
                    width={500}
                    height={500}
                    class="w-32 h-32 rounded-md  object-cover"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                  <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-50 mb-2">
                        {item.title}
                      </h2>
                      <p className="text-slate-800 dark:text-slate-50">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 md:mt-0">
                      <span className="text-lg font-semibold text-slate-800 dark:text-slate-50">
                        EGP {item.price * item.quantity}
                      </span>
                      <Link
                        href={`products/${item.productId}`}
                        className="text-slate-800 hover:text-lime-500 hover:dark:text-lime-500  dark:text-slate-50"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>

          <hr className="mt-8 border-slate-200" />

          <div className="flex items-center mt-8 space-x-5">
            <Link
              href={`/orders/${order.id}/invoice`}
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-slate-900 transition-all duration-200 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 hover:bg-slate-100"
            >
              View Invoice
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
