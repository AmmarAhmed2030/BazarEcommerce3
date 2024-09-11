import Link from 'next/link';
import React from 'react';

export default function CartSubTotalCard({ subTotal }) {
  const shipping = 10;
  const tax = 0;
  let totalPrice = 0;
  if (subTotal > 0) {
    totalPrice = (Number(subTotal) + Number(shipping) + Number(tax)).toFixed(2);
  } else {
    totalPrice = Number(subTotal).toFixed(2);
  }

  return (
    <div className="lg:col-span-4 col-span-full bg-gray-50 border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-50 overflow-hidden p-5 px-10 shadow-md h-[530px]">
      <h2 className="text-2xl py-3">Cart total</h2>
      <div className="flex justify-between items-center border-b border-slate-500 pb-6">
        <span>Subtotal</span>
        <span>EGP {subTotal}</span>
      </div>
      <div className="flex justify-between items-center  pb-4 pt-6">
        <span>Tax</span>
        <span>EGP {tax}</span>
      </div>
      <div className="flex justify-between items-center  pb-4">
        <span>Shipping </span>
        <span>EGP {shipping}</span>
      </div>
      <p className="pb-6 border-b border-slate-500 text-sm text-slate-600 dark:text-slate-400">
        we only charge for shipping when you have over 2kg items
      </p>
      <div className="flex justify-between items-center py-6 font-bold">
        <span>Total</span>
        <span>EGP {totalPrice}</span>
      </div>
      <div className="flex justify-center px-4 mt-8">
        {' '}
        <Link
          href="/checkout"
          className="bg-lime-600 text-slate-50 hover:bg-lime-800  dark:text-slate-50  transition-all duration-500 rounded-lg py-3 px-3"
        >
          Continue to Checkout
        </Link>
      </div>
    </div>
  );
}
