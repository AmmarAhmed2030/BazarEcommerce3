'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';

export default function RegisterForm({ role = 'USER' }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(''); // Ensure this is not being overwritten

  async function onSubmit(data) {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success('User Created Successfully');
        reset();
        if (role === 'USER') {
          router.push('/');
        } else {
          router.push(`/verify-email`);
        }
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr('User with this Email already exists'); // Ensure this function call is correct
          toast.error('User with this Email already exists');
        } else {
          console.error('Server Error:', responseData.error);
          toast.error('Oops Something Went wrong');
        }
      }
    } catch (error) {
      setLoading(false);
      console.error('Network Error:', error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <TextInput
        label=""
        name="role"
        type="hidden"
        register={register('role', { required: true })}
        errors={errors}
        defaultValue={role}
        className="sm:col-span-2 mb-3"
      />
      <TextInput
        label="Your Full Name"
        name="name"
        register={register('name', {
          required: 'Name is required',
          minLength: {
            value: 3,
            message: 'Name must be at least 3 letters',
          },
        })}
        errors={errors}
        className="sm:col-span-2 mb-3"
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
        className="sm:col-span-2 mb-3"
      />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      {emailErr && (
        <small className="text-red-600 -mt-2 mb-2">{emailErr}</small>
      )}
      <TextInput
        label="Password"
        name="password"
        type="password"
        register={register('password', {
          required: 'Password is required',
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/*#_+-]).{8,}$/,
            message:
              'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (/ * # _ - +).',
          },
        })}
        errors={errors}
        className="sm:col-span-2 mb-3"
      />
      <SubmitButton
        isLoading={loading}
        buttonTitle="Register"
        loadingButtonTitle="Creating Please Wait..."
      />
      <div className="flex gap-4">
        <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400 py-4">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
          >
            Login
          </Link>
        </p>
        {role === 'USER' ? (
          <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400 py-4">
            Are you a Farmer?{' '}
            <Link
              href="/register-farmer"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Register here
            </Link>
          </p>
        ) : (
          <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400 py-4">
            Are you a User?{' '}
            <Link
              href="/register"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Register here
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}
