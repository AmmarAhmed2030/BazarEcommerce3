'use client';

import ImageInput from '@/components/FormInputs/ImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { makePutRequest } from '@/lib/apiRequest';
import { generateSlug } from '@/lib/generateSlug';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import QuillEditor from '@/components/FormInputs/QuillEditor';
import { useRouter } from 'next/navigation';

export default function NewTrainingForm({ categories, updateData }) {
  //Heading
  //Table
  const id = updateData?.id ?? '';
  const initialImageUrl = updateData?.imageUrl ?? '';
  const initialContent = updateData?.content ?? '';
  const [content, setContent] = useState(initialContent);
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
    router.push('/dashboard/community');
  }
  const isActive = watch('isActive');
  async function onSubmit(data) {
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;

    await makePutRequest(
      setLoading,
      `/api/trainings/${id}`,
      data,
      'Training',

      reset,
      redirect,
    );
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl py-4 px-2 xs:px-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-800 dark:border-slate-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Training Title"
            name="title"
            register={register('title', {
              required: 'Training Title is required',
              minLength: {
                value: 3,
                message: 'Training Title must be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            hasMultipleSelect={false}
          />
          <TextareaInput
            label="Training Description"
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
            label="Training Thumbnail"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="trainingImageUploader"
          />

          <QuillEditor
            value={content}
            onChange={setContent}
            label="Training  Content"
          />
          <ToggleInput
            label="Publish your Training"
            name="isActive"
            isActive={isActive}
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? 'Update Training' : 'Create Training'}
          loadingButtonTitle={`${id ? 'Updating' : 'Creating'} Training please wait...`}
        />
      </form>
    </div>
  );
}
