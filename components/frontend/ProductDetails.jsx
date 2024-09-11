'use client';
import {
  addToCart,
  decrementQty,
  incrementQty,
} from '@/redux/slices/cartSlice';
import { BaggageClaim, Minus, Plus, Tag } from 'lucide-react';

import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ProductShare from './ProductShare';
import ProductImageCarousel from './ProductImageCarousel';

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart);
  const foundItem = cartItems.find((item) => item.id === product.id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToShare = `${baseUrl}/products/${product.id}`;
  function handleIncrementQty(cartId) {
    dispatch(incrementQty(cartId));
  }
  function handleDecrementQty(cartId) {
    dispatch(decrementQty(cartId));
  }
  function handleAddToCart() {
    //Dispatch the reducer
    dispatch(addToCart(product));
    toast.success('item added successfully');
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-8 p-5">
      {/* Product Image Carousel */}
      <div className="col-span-1 sm:col-span-3 lg:col-span-3">
        <ProductImageCarousel
          productImages={product.productImages}
          thumbnail={product.imageUrl}
        />
      </div>

      {/* Product Details */}
      <div className="col-span-1 sm:col-span-3 lg:col-span-9">
        <div className="flex lg:flex-row items-start lg:items-center justify-between mb-6">
          <h2 className="text-xl lg:text-3xl font-semibold">
            {product?.title}
          </h2>
          <ProductShare urlToShare={urlToShare} />
        </div>
        <div className="border-b border-slate-500 mb-4">
          <p className="py-2">{product?.description}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-4">
            <p>SKU: {product?.sku}</p>
            <p className="bg-slate-800 dark:bg-lime-600 text-white flex justify-center gap-2 py-1.5 px-4 rounded-full">
              <b>Stock</b> <span>:{product?.productStock}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-4 border-b border-slate-500 pb-4">
          <div className="flex items-center">
            <h4 className="text-2xl">EGP {product?.salePrice}</h4>
            <del className="text-slate-400 text-sm ml-2">
              EGP {product?.productPrice}
            </del>
          </div>
          <p className="flex items-center mt-2 lg:mt-0">
            <Tag className="w-5 h-5 text-slate-400 mr-2" />
            <span>
              Save{' '}
              {Math.floor(
                ((product.productPrice - product.salePrice) /
                  product.productPrice) *
                  100,
              )}
              % right now
            </span>
          </p>
        </div>
        <div className="flex lg:flex-row justify-between items-start lg:items-center py-6 gap-4">
          {foundItem && (
            <div className="flex items-center rounded-lg border border-slate-400 gap-3 mb-4 lg:mb-0">
              <button
                onClick={() => handleDecrementQty(product.id)}
                className="border-r-2 border-slate-400 py-2 dark:hover:bg-slate-700 hover:bg-slate-300 px-4 rounded-l-lg"
              >
                <Minus />
              </button>
              <p className="flex-grow py-2 px-4">
                {foundItem?.qty > 0 ? foundItem.qty : 0}
              </p>
              <button
                onClick={() => {
                  handleIncrementQty(product.id);
                  if (!foundItem) {
                    toast.error('Please add item first to cart');
                  }
                }}
                className="border-l-2 border-slate-400 py-2 dark:hover:bg-slate-700 hover:bg-slate-300 px-4 rounded-r-lg"
              >
                <Plus />
              </button>
            </div>
          )}
          <button
            onClick={() => handleAddToCart()}
            className="flex items-center space-x-2 bg-lime-600 py-2 text-white px-4 rounded-md"
          >
            <BaggageClaim />
            <Plus />
            <span className="hidden sm:block">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
