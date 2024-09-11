'use client';
import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import { generateSlug } from '@/lib/generateSlug';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NewCategoryForm({ updateData = {} }) {
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
    router.push('/dashboard/categories');
  }
  const isActive = watch('isActive');
  async function onSubmit(data) {
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    if (id) {
      data.id = id;
      makePutRequest(
        setLoading,
        `/api/categories/${id}`,
        data,
        'Category',
        redirect,
      );
    } else {
      makePostRequest(
        setLoading,
        '/api/categories',
        data,
        'Category',
        redirect,
        reset,
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
            label="Category Title"
            name="title"
            register={register('title', {
              required: 'Category Title is required',
              minLength: {
                value: 3,
                message: 'Category Title must be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />

          <TextareaInput
            label="Category Description"
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
            label="Category Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="categoryImageUploader"
          />
          <ToggleInput
            label="Publish your Category"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            isActive={isActive}
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? 'Update Category' : 'Create Category'}
          loadingButtonTitle={
            id
              ? 'Updating Category please wait...'
              : 'Creating Category please wait...'
          }
        />
      </form>
    </div>
  );
}
