'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NavButtons from './NavButtons';
import { Circle, CreditCard, Wallet } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentStep,
  updateCheckoutFormData,
} from '@/redux/slices/checkoutSlice';

export default function PaymentMethodForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData,
  );
  const initialPaymentMethod = existingFormData.paymentMethod || '';
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);
  const {
    register,

    handleSubmit,
  } = useForm({
    defaultValues: {
      ...existingFormData,
    },
  });
  async function processData(data) {
    data.paymentMethod = paymentMethod;
    dispatch(updateCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Payment Method
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2 ">
            Which Payment Method Do You Prefer ?
          </label>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <li>
              <input
                {...register('paymentMethod', { required: true })}
                type="radio"
                id="cash"
                name="paymentMethod"
                value="Cash On Delivery"
                className="hidden peer"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                htmlFor="cash"
                className="inline-flex items-center justify-between w-full p-5 text-slate-500 bg-white border border-slate-200 rounded-lg cursor-pointer dark:hover:text-slate-300 dark:border-slate-700 dark:peer-checked:text-lime-500 peer-checked:border-lime-600 peer-checked:text-lime-600 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <div className="flex items-center gap-4">
                  <Wallet />
                  <div className="flex flex-col gap-2">
                    <p>COD</p>
                    <p>Cash On Delivery</p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3" />
              </label>
              {!paymentMethod && (
                <span className="text-sm text-red-600 ">
                  Payment Method is required
                </span>
              )}
            </li>
            <li>
              <input
                {...register('paymentMethod', { required: true })}
                type="radio"
                id="card"
                name="paymentMethod"
                value="Credit Card"
                className="hidden peer"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                htmlFor="card"
                className="inline-flex items-center justify-between w-full p-5 text-slate-500 bg-white border border-slate-200 rounded-lg cursor-pointer dark:hover:text-slate-300 dark:border-slate-700 dark:peer-checked:text-lime-500 peer-checked:border-lime-600 peer-checked:text-lime-600 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <div className="flex items-center gap-4">
                  <CreditCard />
                  <div className="flex flex-col gap-2">
                    <p>CCA</p>
                    <p>Credit Card</p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3" />
              </label>
              {!paymentMethod && (
                <span className="text-sm text-red-600 ">
                  Payment Method is required
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <NavButtons />
    </form>
  );
}
