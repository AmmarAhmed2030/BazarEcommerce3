'use client';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';

export default function Paginate({ totalPages, totalLength }) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'asc';
  const min = searchParams.get('min') || 0;
  const max = searchParams.get('max') || '';
  totalPages = Math.ceil(totalLength / 3);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              search
                ? `${currentPage === 1 ? `?${new URLSearchParams({ search, page: 1, sort, min, max })}` : `?${new URLSearchParams({ search, page: parseInt(currentPage) - 1, sort, min, max })}`}`
                : `${currentPage === 1 ? `?${new URLSearchParams({ page: 1, sort, min, max })}` : `?${new URLSearchParams({ page: parseInt(currentPage) - 1, sort, min, max })}`}`
            }
          />
        </PaginationItem>
        {totalPages <= 3 ? (
          Array.from({ length: totalPages }, (_, index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={
                    search
                      ? `?${new URLSearchParams({ search, page: index + 1, sort, min, max })}`
                      : `?${new URLSearchParams({ page: index + 1, sort, min, max })}`
                  }
                  isActive={index + 1 === currentPage}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })
        ) : (
          <>
            {' '}
            {Array.from({ length: 3 }, (_, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={
                      search
                        ? `?${new URLSearchParams({ search, page: index + 1, sort, min, max })}`
                        : `?${new URLSearchParams({ page: index + 1, sort, min, max })}`
                    }
                    isActive={index + 1 === currentPage}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </>
        )}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={
              search
                ? `${currentPage === totalPages ? `?${new URLSearchParams({ page: totalPages, min, max, sort, search })}` : `?${new URLSearchParams({ page: parseInt(currentPage) + 1, min, max, sort, search })}`}`
                : `${currentPage === totalPages ? `?${new URLSearchParams({ page: totalPages, sort, min, max })}` : `?${new URLSearchParams({ page: parseInt(currentPage) + 1, sort, min, max })}`}`
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
