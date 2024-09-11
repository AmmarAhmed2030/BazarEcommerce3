import React from 'react';

export default function Heading({ title }) {
  return (
    <div>
      <h2 className="font-semibold text-slate-800 dark:text-slate-50 text-2xl">
        {title}
      </h2>
    </div>
  );
}
