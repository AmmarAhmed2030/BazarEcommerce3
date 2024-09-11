'use client';

import { addToCart } from '@/redux/slices/cartSlice';
import { Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function Product({ product }) {
  const dispatch = useDispatch();

  // Ensure that product is not null or undefined
  if (!product) {
    return <div>Product not found.</div>;
  }

  function handleAddToCart() {
    try {
      // Dispatch the reducer
      dispatch(addToCart(product));
      toast.success('Item added successfully');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  }

  return (
    <div className="group relative rounded-lg border-2 border-slate-300 shadow overflow-hidden">
      <Link
        href={`/products/${product.id}`}
        className="block overflow-hidden aspect-w-16 aspect-h-9 border-b border-slate-200"
      >
        {/* Check if product.imageUrl exists before using it */}
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title || 'Product Image'}
            width={556}
            height={556}
            className="rounded-t-lg w-full h-56 transition-all duration-200 transform group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
      </Link>
      <div className="px-4">
        <Link href={`/products/${product.id}`}>
          <h2 className="text-center py-4 mb-2 font-semibold truncate overflow-hidden whitespace-nowrap">
            {product.title || 'Untitled Product'}
          </h2>
        </Link>
        <div className="flex justify-between items-center pb-3 py-6 text-slate-800 dark:text-slate-50">
          <p>
            EGP <span>{product.salePrice || 'N/A'}</span>
            {product.productPrice && (
              <del className="pl-2">{product.productPrice}</del>
            )}
          </p>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-4 dark:bg-lime-600 bg-slate-800 hover:bg-slate-700 dark:hover:bg-lime-400 transition-all duration-500 py-2 text-white px-4 rounded-md"
          >
            <ShoppingCart className="text-lime-600 dark:text-slate-50" />
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
