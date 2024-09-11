'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function FormHeader({ title }) {
  const router = useRouter();
  return (
    <div className="flex max-w-4xl mx-auto items-center justify-between py-6 px-12 bg-white text-slate-800 dark:text-slate-50 dark:bg-slate-700 rounded-lg shadow-sm">
      <h2 className="font-semibold text-xl">{title}</h2>
      <button
        onClick={() => router.back()}
        className="dark:text-slate-50 dark:hover:bg-slate-500 hover:bg-slate-200 rounded-sm  text-slate-800"
      >
        <X />
      </button>
    </div>
  );
}
