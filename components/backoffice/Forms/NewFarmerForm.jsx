'use client';

import ArrayItemsInput from '@/components/FormInputs/ArrayItemsInput';
import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { makePutRequest } from '@/lib/apiRequest';
import { generateUserCode } from '@/lib/generateUserCode';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NewFarmerForm({ updateData = {}, user = {} }) {
  //Heading
  //Table
  const initialImageUrl = updateData?.profileImageUrl ?? '';
  // console.log('user from new farmerForm', user);
  console.log('farmer from new farmerForm', updateData);

  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(updateData?.products || []);
  const {
    register,

    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      isActive: true,

      ...updateData,
      email: user?.email,
    },
  });
  const router = useRouter();

  const id = updateData?.userId;
  console.log('id : ', id);
  const isActive = watch('isActive');

  function redirect() {
    router.push(`/farmers/viewProfile/${id}`);
  }

  async function onSubmit(data) {
    setLoading(true);
    const code = generateUserCode('AFF', data.name);
    data.code = code;
    data.products = products;
    data.userId = id;
    data.profileImageUrl = imageUrl;
    data.email = user?.email;

    await makePutRequest(
      setLoading,
      `/api/farmers/update/${id}`,
      data,
      'FarmerProfile',
      redirect,
    );
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Farmer's Full Name"
            name="name"
            register={register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Farmer's Phone"
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
          <TextInput
            label="Farmer's Email Address"
            name="email"
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            disabled={true}
            defaultValue={updateData?.email}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Farmer's Physical Address"
            name="physicalAddress"
            register={register('physicalAddress', {
              required: 'Physical Address is required',
              minLength: {
                value: 3,
                message: 'Physical Address must be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Farmer's Contact Person"
            name="contactPerson"
            register={register('contactPerson', {
              required: 'Contact person is required',
              minLength: {
                value: 3,
                message: 'Contact person must be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Farmer's Contact Person Phone With Country Code"
            name="contactPersonPhone"
            register={register('contactPersonPhone', {
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
          <TextInput
            label="What is the size of your land in Accres"
            name="landSize"
            type="number"
            register={register('landSize', {
              required: 'This field is required',
              valueAsNumber: true,
              validate: {
                positive: (value) =>
                  value >= 0 || 'Only positive numbers are allowed',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="What is  your main crop"
            name="mainCrop"
            type="text"
            register={register('mainCrop', {
              required: 'Main Corp is required',
              minLength: {
                value: 3,
                message: 'Main Corp must be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <ArrayItemsInput
            setItems={setProducts}
            items={products}
            itemsTitle="Product"
          />
          <TextareaInput
            label="Farmer's Payment Terms"
            name="terms"
            register={register('terms', {
              required: false,
              minLength: {
                value: 30,
                message: 'Terms must be at least 30 letters',
              },
            })}
            errors={errors}
            isRequired={false}
          />
          <TextareaInput
            label="Notes"
            name="notes"
            register={register('notes', {
              required: false,

              minLength: {
                value: 30,
                message: 'Notes must be at least 30 letters',
              },
            })}
            errors={errors}
            isRequired={false}
          />
          <ImageInput
            label="Farmer Profile Photo"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="farmerImageUploader"
          />
          <ToggleInput
            label="Farmer Status"
            name="isActive"
            isActive={isActive}
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle="Update Farmer"
          loadingButtonTitle="Updating Farmer please wait..."
        />
      </form>
    </div>
  );
}
