import { Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ViewBtn({ viewEndpoint, title }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Link
      href={`${baseUrl}/dashboard/${viewEndpoint}`}
      className="flex items-center text-lime-600"
    >
      <Eye className="mr-4 w-4 h-4" />
      <span>View {title}</span>
    </Link>
  );
}
