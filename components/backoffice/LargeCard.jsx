import { Layers } from 'lucide-react';
import React from 'react';

export default function LargeCard({ data }) {
  return (
    <div
      className={`rounded-lg ${data.color} text-white shadow-md p-8 flex items-center flex-col gap-2`}
    >
      <Layers />
      <h4>{data.period}</h4>
      <h2 className="lg:text-3xl text-2xl">EGP : {data.sales}</h2>
    </div>
  );
}
