import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from '@/redux/slices/cartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function CartProduct({ cartItem }) {
  const dispatch = useDispatch();
  function handleCartItemDelete(cartId) {
    dispatch(removeFromCart(cartId));
    toast.success('Item removed Successfully');
  }
  function handleIncrementQty(cartId) {
    dispatch(incrementQty(cartId));
  }
  function handleDecrementQty(cartId) {
    dispatch(decrementQty(cartId));
  }
  return (
    <div className="flex items-center justify-between border-b border-slate-400 font-semibold text-sm">
      <div className="flex items-center gap-8  mb-4">
        <Image
          src={cartItem.imageUrl}
          width={249}
          height={249}
          alt={cartItem.title}
          className="rounded-xl w-14 h-14"
        />

        <h2 className="overflow-hidden w-40 h-14">{cartItem.title}</h2>
      </div>
      <div className=" rounded-lg border border-gray-400 flex gap-3 items-center mb-4">
        <button
          onClick={() => handleDecrementQty(cartItem.id)}
          className="border-r-2 border-slate-400 py-2 dark:hover:bg-slate-700 hover:bg-slate-300 px-4 rounded-l-lg"
        >
          {' '}
          <Minus />
        </button>
        <p className="flex-grow py-2  px-4">{cartItem.qty}</p>
        <button
          onClick={() => handleIncrementQty(cartItem.id)}
          className="border-l-2 border-gray-400 py-2 dark:hover:bg-slate-700 hover:bg-gray-300 px-4  rounded-r-lg"
        >
          {' '}
          <Plus />
        </button>
      </div>
      <div className="flex items-center gap-8 mb-4">
        <h4 className="px-4">EGP{cartItem.salePrice}</h4>
        <button onClick={() => handleCartItemDelete(cartItem.id)}>
          {' '}
          <Trash2 className="text-red-600 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
