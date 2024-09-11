import { UploadDropzone } from '@/lib/uploadthing';
import { XCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';

export default function MultipleImageInput({
  label,
  imageUrls = [],
  setImageUrls,
  className = 'col-span-full  border-2 border-gray-50 p-2 px-4 rounded-lg',
  endpoint = '',
}) {
  function handleImageRemove(imageIndex) {
    const updatedImages = imageUrls.filter(
      (image, index) => index !== imageIndex,
    );
    setImageUrls(updatedImages);
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50 mb-2"
        >
          {label}
        </label>
      </div>
      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((imageUrl, i) => (
            <div className="relative mb-6" key={i}>
              <button
                onClick={() => handleImageRemove(i)}
                className="absolute -top-4 -right-2 bg-slate-100 text-slate-900 rounded-full"
              >
                <XCircle />
              </button>
              <Image
                src={imageUrl}
                alt="Item image"
                width={1000}
                height={667}
                className="w-full h-32 object-contain"
              />
            </div>
          ))}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
         
            const urls = res.map((item) => item.url);
            setImageUrls(urls);
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error('Image Upload Failed, Try Again');
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}
