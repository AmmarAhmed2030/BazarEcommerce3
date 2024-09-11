import { convertIsoDateToNormal } from '@/lib/convertIsoDateToNormal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function RecentTrainings({ recentTrainings }) {
  return (
    <div className="lg:col-span-2">
      <p className="text-xl font-bold ">Recent Trainings</p>

      <div className="mt-6 space-y-5">
        {recentTrainings.map((training, i) => {
          let normalDate = convertIsoDateToNormal(training.createdAt);
          return (
            <div
              key={i}
              className="relative overflow-hidden transition-all duration-200  border border-slate-200 rounded-lg hover:shadow-lg hover:bg-slate-50 hover:dark:bg-slate-600 hover:-translate-y-1"
            >
              <div className="p-4">
                <div className="flex items-start lg:items-center">
                  <Image
                    width={500}
                    height={500}
                    className="object-cover w-20 h-20 rounded-lg shrink-0"
                    alt={training.title}
                    src={training.imageUrl}
                  />
                  <div className="ml-5">
                    <p className="text-sm font-medium ">{normalDate}</p>
                    <p className="text-lg leading-7 font-bold mt-2.5">
                      <Link href={`/blogs/${training.slug}`}>
                        {training.title}
                        <span
                          className="absolute inset-0"
                          aria-hidden="true"
                        ></span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
