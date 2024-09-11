import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className="flex-col justify-center items-center w-full bg-slate-50 py-8 px-8">
      <Link
        href="/"
        className="flex gap-2  text-slate-50 bg-lime-500 px-2 py-2 w-32 rounded-md hover:bg-lime-800 transition-all duration-500"
      >
        <ArrowLeft />
        Go Home
      </Link>
      <Image
        src="/unauthorized.svg"
        width={1000}
        height={1000}
        alt="ss"
        className="w-[600px] min-h-screen mx-auto"
      />
    </div>
  );
}
