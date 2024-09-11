'use client';
import React from 'react';
import CartProduct from './CartProduct';
import Image from 'next/image';
import Link from 'next/link';

export default function CartItems({ cartItems }) {
  return (
    <div className="lg:col-span-8 col-span-full bg-slate-50 border border-slate-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-50 p-5 shadow-md">
      {cartItems.length > 0 && (
        <>
          <h2 className="py-4 text-2xl">Your Cart</h2>
          <div className="flex items-center justify-between  border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm">
            <h2 className="uppercase ">Product</h2>
            <h2 className="uppercase ">Quantity</h2>
            <h2 className="uppercase ">Price</h2>
          </div>
        </>
      )}
      <div className="flex flex-col gap-4  overflow-auto py-4 px-4">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartProduct cartItem={item} key={index} />
          ))
        ) : (
          <div className="bg-white dark:bg-slate-200 flex flex-col items-center justify-center rounded-lg">
            <div className="flex items-center justify-center gap-2 text-slate-900 py-4 text-md md:text-2xl">
              {' '}
              <p>Your Cart is Empty</p>
              <Link href="/" className="underline text-lime-600">
                Start Shopping
              </Link>
            </div>

            <Image
              src="/emptyCart.png"
              width={3000}
              height={3000}
              alt="No Items"
              className="w-96 object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
