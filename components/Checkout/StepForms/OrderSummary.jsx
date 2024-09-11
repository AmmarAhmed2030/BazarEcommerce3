'use client';
import {
  setCurrentStep,
  updateCheckoutFormData,
} from '@/redux/slices/checkoutSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderSummary() {
  const [loading, setLoading] = useState(false);
  const checkoutFormData = useSelector(
    (store) => store.checkout.checkoutFormData,
  );
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }
  const cartItems = useSelector((store) => store.cart);
  const router = useRouter();

  async function submitData() {
    const combinedData = {
      orderItems: cartItems,
      checkoutFormData,
    };
    dispatch(updateCheckoutFormData(combinedData));
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });
      const responseData = await response.json();
      console.log('order response from order summary', responseData);
      if (response.ok) {
        setLoading(false);
        toast.success('Order Created Successfully');
        if (responseData.paymentMethod === 'Cash On Delivery') {
          router.push(`/order-confirmation/${responseData.id}`);
        } else {
          router.push(`/online-payment/${responseData.id}`);
        }
      } else {
        setLoading(false);
        toast.error('Something went Wrong please try again');
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    // makePostRequest(setLoading, '/api/orders', combinedData, 'Order', redirect);
  }
  return (
    <div className="max-h-[300px] overflow-auto my-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Order Summary
      </h2>
      {cartItems.length > 0 &&
        cartItems.map((cartItem, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-slate-400 font-semibold text-sm px-5 bg-slate-50 dark:bg-gray-800 text-slate-800 dark:text-slate-50 overflow-auto"
          >
            <div className="flex items-center gap-8  mb-4 mt-4 ">
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
              <p className="flex-grow py-2  px-4">{cartItem.qty}</p>
            </div>
            <div className="flex items-center gap-8 mb-4">
              <h4>EGP{cartItem.salePrice}</h4>
            </div>
          </div>
        ))}
      <div className="mt-4 flex justify-between items-center px-6 py-4 gap-4">
        <button
          onClick={handlePrevious}
          type="submit"
          className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
        {loading ? (
          <button className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700">
            <span>Wait...</span>
          </button>
        ) : (
          <button
            onClick={submitData}
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Pay</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
//Ae62cv9N1wnpm1QfMZ0JBa7x7hzVtUArcBF_PQKZU1pAc2g2d2yLa4vGyc0KHSilfBIulpKtJHAIwtOv     client ID
//ECkkA_hr2tveYBroS5n3TfviZ3jlyjuxm4b23XUlZiaI8aQCf1VIEEzyB7LWTNUsibNWk5SDW1OcxAWa     secret key
