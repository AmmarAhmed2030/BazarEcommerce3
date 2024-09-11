'use client';
import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';

import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NewBannerForm({ updateData = {} }) {
  //Heading
  //Table
  const initialImageUrl = updateData?.imageUrl ?? '';
  const id = updateData?.id ?? '';
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
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
    router.push('/dashboard/banners');
  }
  const isActive = watch('isActive');

  async function onSubmit(data) {
    setLoading(true);

    data.imageUrl = imageUrl;
    if (id) {
      data.id = id;
      makePutRequest(
        setLoading,
        `/api/banners/${id}`,
        data,
        'Banner',
        redirect,
      );
      console.log('update Request : ', data);
    } else {
      makePostRequest(
        setLoading,
        '/api/banners',
        data,
        'Banner',

        reset,
        redirect,
      );
      setImageUrl('');
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
            label="Banner Title"
            name="title"
            register={register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 letters',
              },
            })}
            errors={errors}
          />
          <TextInput
            label="Banner Link"
            name="link"
            register={register('link', {
              required: 'URL is required',
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Please enter a valid URL',
              },
            })}
            errors={errors}
            type="url"
          />
          <ImageInput
            label="Banner Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="bannerImageUploader"
          />
          <ToggleInput
            label="Publish your Banner"
            name="isActive"
            isActive={isActive}
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? 'Update Banner' : 'Create Banner'}
          loadingButtonTitle={`${id ? 'Updating' : 'Creating'} Banner please wait...`}
        />
      </form>
    </div>
  );
}
