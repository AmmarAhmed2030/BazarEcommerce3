'use client';
import Breadcrumb from '@/components/frontend/Breadcrumb';
import CartItems from '@/components/frontend/CartItems';
import CartSubTotalCard from '@/components/frontend/CartSubTotalCard';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Cart() {
  const cartItems = useSelector((store) => store.cart) || [];
  const subTotal =
    cartItems.length > 0
      ? cartItems
          .reduce(
            (acc, currentItem) => acc + currentItem.salePrice * currentItem.qty,
            0,
          )
          .toFixed(2)
      : 0;

  console.log(cartItems);

  return (
    <div>
      <Breadcrumb />
      <div className="grid grid-cols-12 gap-4 lg:gap-16 px-4">
        {cartItems.length > 0 ? (
          <>
            <CartItems cartItems={cartItems} />
            <CartSubTotalCard subTotal={subTotal} />
          </>
        ) : (
          <div className="col-span-12 text-center">
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}
