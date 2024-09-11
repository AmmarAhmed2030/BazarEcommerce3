'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Breadcrumb({ title, productCount = 0 }) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page');
  const pageSize = 3;
  const skip = (parseInt(currentPage) - 1) * parseInt(pageSize) + 1 || 1;

  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center">
          <Link href="/">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <p>{title}</p>
        </div>
        <p>
          {productCount > 0 && (
            <span>
              {' '}
              {skip}-
              {skip + pageSize - 1 > productCount
                ? productCount
                : skip + pageSize - 1}{' '}
              of{' '}
            </span>
          )}{' '}
          {productCount} results
        </p>
      </div>
    </div>
  );
}
