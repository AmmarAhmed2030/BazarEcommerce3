import React from 'react';
import Heading from './Heading';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function PageHeader({ heading, linkTitle, href }) {
  return (
    <div className="flex justify-between">
      <Heading title={heading} />
      <Link
        className="text-white bg-lime-600 hover:bg-lime-600/90 focus:ring-4 focus:outline-none focus:ring-lime-600/50 font-medium rounded-lg px-2 xs:text-base xs:px-5 py-3 xs:space-x-3 text-center inline-flex items-center dark:focus:ring-green-600/55 me-2"
        href={href}
      >
        <Plus />
        <span>{linkTitle}</span>
      </Link>
    </div>
  );
}
