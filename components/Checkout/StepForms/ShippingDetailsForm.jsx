'use client';
import TextInput from '@/components/FormInputs/TextInput';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NavButtons from './NavButtons';
import { Circle, Truck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentStep,
  updateCheckoutFormData,
} from '@/redux/slices/checkoutSlice';

export default function ShippingDetailsForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData,
  );
  const {
    register,

    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      ...existingFormData,
    },
  });
  const initialShippingCost = existingFormData.shippingCost || '';
  const [shippingCost, setShippingCost] = useState(initialShippingCost);

  async function processData(data) {
    data.shippingCost = shippingCost;
    dispatch(updateCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Shipping Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register('streetAddress', {
            required: 'Street Address is required',
            minLength: {
              value: 3,
              message: 'Street Address must be at least 3 letters',
            },
          })}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="City"
          name="city"
          register={register('city', {
            required: 'City is required',
            minLength: {
              value: 3,
              message: 'City must be at least 3 letters',
            },
          })}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Country"
          name="country"
          register={register('country', {
            required: 'Country is required',
            minLength: {
              value: 3,
              message: 'Country must be at least 3 letters',
            },
          })}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="District"
          name="district"
          register={register('district', {
            required: 'District is required',
            minLength: {
              value: 3,
              message: 'District must be at least 3 letters',
            },
          })}
          errors={errors}
          className="w-full"
        />
        <div className="flex flex-col sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2 ">
            Shipping Cost ?
          </label>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <li>
              <input
                {...register('shippingCost', { required: true })}
                type="radio"
                id="cheap"
                name="shippingCost"
                value="8"
                className="hidden peer"
                required
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <label
                htmlFor="cheap"
                className="inline-flex items-center justify-between w-full p-5 text-slate-500 bg-white border border-slate-200 rounded-lg cursor-pointer dark:hover:text-slate-300 dark:border-slate-700 dark:peer-checked:text-lime-500 peer-checked:border-lime-600 peer-checked:text-lime-600 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <div className="flex items-center gap-4">
                  <Truck />
                  <div className="flex flex-col gap-2">
                    <p>CSH</p>
                    <p>Delivery Cost: $8</p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3" />
              </label>
              {!shippingCost && (
                <span className="text-sm text-red-600 ">
                  Shipping Cost is required
                </span>
              )}
            </li>
            <li>
              <input
                {...register('shippingCost', { required: true })}
                type="radio"
                id="expensive"
                name="shippingCost"
                value="20"
                className="hidden peer"
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <label
                htmlFor="expensive"
                className="inline-flex items-center justify-between w-full p-5 text-slate-500 bg-white border border-slate-200 rounded-lg cursor-pointer dark:hover:text-slate-300 dark:border-slate-700 dark:peer-checked:text-lime-500 peer-checked:border-lime-600 peer-checked:text-lime-600 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <div className="flex items-center gap-4">
                  <Truck />
                  <div className="flex flex-col gap-2">
                    <p>FSH</p>
                    <p>Delivery Cost: $10</p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3" />
              </label>
              {!shippingCost && (
                <span className="text-sm text-red-600 ">
                  Shipping Cost is required
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
