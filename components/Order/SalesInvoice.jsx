'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import Link from 'next/link';
import { convertIsoDateToNormal } from '@/lib/convertIsoDateToNormal';
import { useReactToPrint } from 'react-to-print';
export default function SalesInvoice({ order }) {
  const invoiceRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  const tax = 20;
  const subTotal = order.orderItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  return (
    <div className="flex flex-col py-8 bg-white text-slate-800 dark:text-slate-50 dark:bg-slate-950">
      <div className="flex items-end justify-end mb-8">
        <button
          onClick={handlePrint}
          type="button"
          className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold text-white  bg-slate-800 dark:bg-lime-600 transition-all duration-200  border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:hover:bg-lime-500 hover:bg-slate-700"
        >
          Download Invoice
        </button>
      </div>
      <div
        ref={invoiceRef}
        className="max-w-4xl mx-auto border border-slate-500 dark:border-slate-50  p-8 rounded-sm bg-white text-slate-800 dark:text-slate-50 dark:bg-slate-700 "
      >
        <div className="flex justify-between border-b border-slate-500  pb-8">
          <div className="flex flex-col">
            <h2>Bill From:</h2>
            <p>
              {order.firstName} {order.lastName}
            </p>
            <p>
              {order.streetAddress}
              {order.city}
              {order.district}
            </p>
            <p>{order.country}</p>
            <p>{order.email}</p>
          </div>
          <Link href="/" className="flex items-center px-8 py-2 ">
            <Image
              src="/logo.svg"
              alt="logo pic"
              width={30}
              height={30}
              className="w-8"
            />
            <div className="flex flex-col items-center">
              <p className="tracking-[5px] px-2 text-xl items-center text-[#737373]">
                BAZAR
              </p>
            </div>
          </Link>
        </div>
        {/* Header End */}
        <div className="flex justify-between border-b border-gray-500 py-8 gap-4">
          <div className="flex flex-col">
            <h2>Bill To:</h2>
            <p>
              {order.firstName} {order.lastName}
            </p>
            <p>
              {order.streetAddress}
              {order.city}
              {order.district}
            </p>
            <p>{order.country}</p>
            <p>{order.email}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p>Invoice #</p>
              <p>{order.orderNumber}</p>
            </div>
            <div className="flex justify-between gap-4">
              <p>Invoice Dates </p>
              <p>{convertIsoDateToNormal(order.createdAt)}</p>
            </div>
            <div className="flex justify-between gap-4">
              <p>Amount Due</p>
              <p>${subTotal}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Item
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit Cost
                </th>
                <th scope="col" className="px-6 py-3">
                  Line Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.title}
                  </th>

                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">${item.quantity * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between border-b border-gray-500 py-8">
          <div className="flex flex-col">
            <h2>NOTES</h2>
            <p>Free Shipping for 30 Days Money back guarantee</p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between gap-4">
              <p>SubTotal</p>
              <p>${subTotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p>${tax}</p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>${(parseFloat(subTotal) + parseFloat(tax)).toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-8">
          <Link href="/" className="flex items-center px-8 py-2 ">
            <Image
              src="/logo.svg"
              alt="logo pic"
              width={30}
              height={30}
              className="w-8"
            />
            <div className="flex flex-col items-center">
              <p className="tracking-[5px] px-2 text-xl items-center text-[#737373]">
                BAZAR
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
