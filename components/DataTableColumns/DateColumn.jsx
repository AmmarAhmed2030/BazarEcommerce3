import { convertIsoDateToNormal } from '@/lib/convertIsoDateToNormal';
import React from 'react';

export default function DateColumn({ row, title }) {
  const createdAt = row.getValue(`${title}`);
  const formattedDate = convertIsoDateToNormal(createdAt); //`${day}${Number(day) < 4 ? 'rd' : 'th'} ${month} ${year}`;

  return <div>{formattedDate}</div>;
}
