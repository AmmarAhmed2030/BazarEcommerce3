'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    try {
      setLoading(true);
      const loginData = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (loginData?.error) {
        setLoading(false);
        toast.error('Sign-in error: Check your credentials');
      } else {
        // Sign-in was successful
        toast.success('Login Successful');
        reset();
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
      console.error('Network Error:', error);
      toast.error('It seems something is wrong with your Network');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
        >
          Your email
        </label>
        <input
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          type="email"
          id="email"
          className="bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
        {errors.email && (
          <small className="text-red-600 text-sm">{errors.email.message}</small>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
        >
          Password
        </label>
        <input
          {...register('password', {
            required: 'This field is required',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/*#_+-]).{8,}$/,
              message:
                'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (/ * # _ - +).',
            },
          })}
          type="password"
          id="password"
          placeholder="••••••••"
          className="bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors.password && (
          <small className="text-red-600 text-sm">
            {errors.password.message}
          </small>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <button
          type="submit"
          className={`w-full text-white ${loading ? 'bg-lime-700' : 'bg-lime-600'} hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800`}
          disabled={loading}
        >
          {loading ? 'please wait...' : 'Login'}
        </button>
      </div>
      <p className="text-sm font-light text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-lime-600 hover:underline dark:text-lime-500"
        >
          Sign Up
        </Link>
      </p>
      <Link
        href="/forgot-password"
        className="text-slate-800 hover:text-lime-600 dark:text-slate-50 dark:hover:text-lime-600 transition-all duration-500 hover:underline-offset-1 text-sm"
      >
        Forgot Password ?
      </Link>
    </form>
  );
}
