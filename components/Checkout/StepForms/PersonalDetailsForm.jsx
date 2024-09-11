'use client';
import TextInput from '@/components/FormInputs/TextInput';
import React from 'react';
import { useForm } from 'react-hook-form';
import NavButtons from './NavButtons';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentStep,
  updateCheckoutFormData,
} from '@/redux/slices/checkoutSlice';
import { useSession } from 'next-auth/react';

export default function PersonalDetailsForm() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const email = session?.user?.email;
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData,
  );
  const {
    register,

    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { ...existingFormData, email: email } });

  const dispatch = useDispatch();

  function processData(data) {
    data.userId = userId;
    data.email = email;
    dispatch(updateCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Personal Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="First Name"
          name="firstName"
          register={register('firstName', {
            required: 'First Name is required',
            minLength: {
              value: 3,
              message: 'First Name must be at least 3 letters',
            },
          })}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Last Name"
          name="lastName"
          register={register('lastName', {
            required: 'Last Name is required',
            minLength: {
              value: 3,
              message: 'Last Name must be at least 3 letters',
            },
          })}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Email Address"
          name="email"
          register={register('email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          errors={errors}
          defaultValue={email}
          disabled={true}
          type="email"
          className="w-full"
        />
        <TextInput
          label="Phone Number"
          name="phone"
          register={register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10,15}$/,
              message:
                'Please enter a valid phone number with country code (10-15 digits)',
            },
          })}
          errors={errors}
          className="w-full"
        />
      </div>
      <NavButtons />
    </form>
  );
}
