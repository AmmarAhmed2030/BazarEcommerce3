'use client';
import TextInput from '@/components/FormInputs/TextInput';
import React from 'react';
import { useForm } from 'react-hook-form';
import NavButtons from './NavButtons';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentStep,
  updateOnboardingFormData,
} from '@/redux/slices/onboardingSlice';

export default function BasicInformationForm({ user }) {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const existingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData,
  );
  const {
    register,

    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { ...existingFormData, email: user.email } });

  const dispatch = useDispatch();

  async function processData(data) {
    dispatch(updateOnboardingFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Basic Information
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
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          defaultValue={user?.email}
          disabled={true}
          errors={errors}
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
