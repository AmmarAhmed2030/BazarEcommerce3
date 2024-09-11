'use client';
import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import { convertIsoDateToNormal } from '@/lib/convertIsoDateToNormal';
import generateIsoFormattedDate from '@/lib/generateIsoFormattedDate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NewUserForm({ updateData = {}, user = {} }) {
  //Heading
  //Table
  console.log('updateData from newUserForm', updateData);
  const initialImageUrl = updateData?.profileImage ?? '';
  const id = user?.id;
  const profileId = updateData?.id;
  const dateOfBirthNormal = convertIsoDateToNormal(updateData.dateOfBirth);
  updateData.dateOfBirth = dateOfBirthNormal;
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const {
    register,
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
  function redirect() {
    router.push(`/`);
  }

  async function onSubmit(data) {
    setLoading(true);
    data.userId = id;
    data.profileImage = imageUrl;
    const isoFormattedDate = generateIsoFormattedDate(data.dateOfBirth);
    data.dateOfBirth = isoFormattedDate;
    data.email = user?.email;
    if (profileId) {
      await makePutRequest(
        setLoading,
        `/api/users/update-profile/${id}`,
        data,
        'UserProfile',
        redirect,
      );
    } else {
      await makePostRequest(
        setLoading,
        `/api/users/create-profile`,
        data,
        'UserProfile',
        redirect,
      );
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl py-4 px-2 xs:px-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-800 dark:border-slate-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="First Name"
            name="firstName"
            register={register('firstName', {
              required: 'First name is required',
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
            label="Full Name"
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
            label="Username"
            name="username"
            register={register('username', {
              required: 'username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Phone"
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
            label="Email Address"
            name="email"
            type="email"
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.email}
            disabled={true}
          />
          <TextInput
            label="Street Address"
            name="streetAddress"
            register={register('streetAddress', {
              required: 'street address is required',
              minLength: {
                value: 3,
                message: 'street address be at least 3 letters',
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
                message: 'City be at least 3 letters',
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
                message: 'Country be at least 3 letters',
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
                message: 'District be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Date Of Birth"
            name="dateOfBirth"
            type="date"
            register={register('dateOfBirth', {
              required: 'Date of Birth is required',
            })}
            errors={errors}
            className="w-full"
          />

          <ImageInput
            label="User Profile Photo"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="userProfileUploader"
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={updateData ? 'Update User' : 'Create User'}
          loadingButtonTitle={
            updateData
              ? 'Updating Profile please wait...'
              : 'Creating Profile please wait...'
          }
        />
      </form>
    </div>
  );
}
