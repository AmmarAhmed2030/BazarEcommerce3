'use client';
import ImageInput from '@/components/FormInputs/ImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';

import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import { generateSlug } from '@/lib/generateSlug';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NewMarketForm({ categories, updateData }) {
  //Heading
  //Table
  const id = updateData?.id ?? '';
  const initialLogoUrl = updateData?.logoUrl ?? '';
  const [logoUrl, setLogoUrl] = useState(initialLogoUrl);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function redirect() {
    router.push('/dashboard/markets');
  }
  const {
    register,
    reset,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });
  const isActive = watch('isActive');
  async function onSubmit(data) {
    setLoading(true);

    const slug = generateSlug(data.title);
    data.slug = slug;
    data.logoUrl = logoUrl;
    if (id) {
      makePutRequest(
        setLoading,
        `/api/markets/${id}`,
        data,
        'Market',

        redirect,
      );
    } else {
      makePostRequest(
        setLoading,
        '/api/markets',
        data,
        'Market',

        reset,
        redirect,
      );
      setLogoUrl('');
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Market Title"
            name="title"
            register={register('title', {
              required: 'Market Title is required',
              minLength: {
                value: 3,
                message: 'Market Title must be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Select Categories"
            name="categoryIds"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            hasMultipleSelect={true}
          />
          <TextareaInput
            label="Market Description"
            name="description"
            register={register('description', {
              required: 'Description is required',
              minLength: {
                value: 30,
                message: 'Description must be at least 30 letters',
              },
            })}
            errors={errors}
          />

          <ImageInput
            label="Market Logo"
            imageUrl={logoUrl}
            setImageUrl={setLogoUrl}
            endpoint="marketLogoUploader"
          />
          <ToggleInput
            label="Market Status"
            name="isActive"
            isActive={isActive}
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? 'Update Market' : 'Create Market'}
          loadingButtonTitle={`${id ? 'Updating' : 'Creating'} Market please wait...`}
        />
      </form>
    </div>
  );
}
