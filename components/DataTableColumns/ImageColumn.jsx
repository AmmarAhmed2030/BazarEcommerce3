import Image from 'next/image';
import React from 'react';

// You can use a local placeholder image or a URL for a placeholder
const placeholderImage = '/fakeimg.png'; // Update this path as needed

export default function ImageColumn({ row, imageTitle }) {
  const imageUrl = row.getValue(imageTitle) || placeholderImage; // Use placeholder if imageUrl is null or undefined

  return (
    <Image
      src={imageUrl}
      alt="Image"
      width={249}
      height={249}
      className="rounded-full w-14 h-14"
    />
  );
}
