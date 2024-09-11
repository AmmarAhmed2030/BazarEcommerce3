import React from 'react';

export default function SmallCard({ data }) {
  const { title, icon: Icon, iconBg, number } = data;
  return (
    <div className="rounded-lg shadow-lg bg-slate-50 dark:bg-slate-700 p-4 text-slate-800 dark:text-slate-50">
      <div className="flex space-x-4">
        <div
          className={`w-12 h-12 ${iconBg} rounded-full flex justify-center items-center `}
        >
          <Icon className="dark:text-slate-50 text-slate-50" />
        </div>

        <div>
          <p>{title}</p>
          <h3 className="text-2xl font-bold ">{number}</h3>
        </div>
      </div>
    </div>
  );
}
