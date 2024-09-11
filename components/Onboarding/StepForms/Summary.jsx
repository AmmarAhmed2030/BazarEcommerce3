'use client';

import { makePostRequest } from '@/lib/apiRequest';
import { generateUserCode } from '@/lib/generateUserCode';
import {
  setCurrentStep,
  updateOnboardingFormData,
} from '@/redux/slices/onboardingSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';

export default function Summary({ farmerId }) {
  const [loading, setLoading] = useState(false);
  const onboardigFormData = useSelector(
    (store) => store.onboarding.onboardingFormData,
  );
  console.log(onboardigFormData);
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }

  const { reset } = useForm({
    defaultValues: {
      ...onboardigFormData,
    },
  });
  const router = useRouter();
  function redirect() {
    router.push('/login');
  }

  async function submitData() {
    const data = { ...onboardigFormData };
    const fullName = `${data.firstName} ${data.lastName}`;
    data.name = fullName;
    data.isActive = true;

    setLoading(true);
    const code = generateUserCode('AFF', fullName);
    data.code = code;
    data.userId = farmerId;
    dispatch(updateOnboardingFormData(data));
    console.log('data from summary', data);
    makePostRequest(
      setLoading,
      '/api/farmers',
      data,
      'FarmerProfile',
      reset,
      redirect,
    );
  }
  return (
    <div className="max-h-[300px] overflow-auto my-6 text-slate-800 dark:text-slate-50 bg-white dark:bg-slate-800 p-3 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">Summary</h2>
      <div className="flex">
        <h2>Here are your Details</h2>
      </div>
      <div className="mt-4 flex justify-between items-center px-6 gap-4">
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
            <span>wait...</span>
          </button>
        ) : (
          <button
            type="submit"
            onClick={submitData}
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Submit</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
