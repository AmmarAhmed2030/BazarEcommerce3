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

export default function NewFarmerForm({ updateData = {} }) {
  const initialImageUrl = updateData?.profileImageUrl ?? '';

  const id = updateData?.userId ?? '';
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const {
    register,

    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      isActive: true,

      ...updateData,
    },
  });
  const router = useRouter();
  function redirect() {
    router.push(`/farmers/viewProfile/${id}`);
  }
  const isActive = watch('isActive');

  async function onSubmit(data) {
    setLoading(true);
    const code = generateUserCode('AFF', data.name);
    data.code = code;
    data.products = products;
    data.userId = id;
    data.profileImageUrl = imageUrl;

    makePutRequest(
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
            label="Customer's Full Name"
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
            label="Customer's Phone"
            name="phone"
            type="tel"
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
            label="Customer's Email Address"
            name="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Farmer's Physical Address"
            name="physicalAddress"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Farmer's Contact Person"
            name="contactPerson"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Farmer's Contact Person Phone"
            type="tel"
            name="contactPersonPhone"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="What is the size of your land in Accres"
            name="landSize"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="What is  your land in Accresmain crop that  you Cultivate"
            name="mainCrop"
            type="text"
            register={register}
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
            register={register}
            errors={errors}
            isRequired={false}
          />
          <TextareaInput
            label="Notes"
            name="notes"
            register={register}
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
