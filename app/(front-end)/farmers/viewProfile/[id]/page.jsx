import { getData } from '@/lib/getData';
import Image from 'next/image';

export default async function FarmerProfile({ params }) {
  const { id } = params;
  const userId = id;
  console.log('user Id from farmers viewProfile', userId);
  const profile = await getData(`farmers/farmer/${id}`);
  console.log('profile Farmer from farmers viewProfile', profile);
  return (
    <div
      className=" lg:mx-auto ml-4 mr-4  dark:bg-slate-700 dark:text-white bg-white text-slate-800
      p-6 rounded-lg shadow-md max-w-3xl"
    >
      <div className="flex items-center mb-6 border-b border-slate-50 py-4 pb-8">
        {profile.profileImageUrl ? (
          <Image
            src={profile.profileImageUrl}
            alt={`${profile.name}'s profile picture`}
            className="w-24 h-24 rounded-full mr-4"
            width={96}
            height={96}
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-slate-500 flex items-center justify-center mr-4">
            <span className="text-2xl px-4">{profile.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold px-4">{profile.name}</h2>
          <p className="text-slate-400  px-4  ">{profile.email}</p>
          {profile.isActive && (
            <span className="bg-lime-500 text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
      </div>

      <div className="mb-6  border-b border-slate-50 py-4 pb-8">
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-bold">Contact Person:</span>{' '}
            {profile.contactPerson || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {profile.phone || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Contact Person Phone:</span>{' '}
            {profile.contactPersonPhone || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Address:</span>{' '}
            {profile.physicalAddress || 'N/A'}
          </p>
        </div>
      </div>

      <div className="mb-6  border-b border-slate-50 py-4 pb-8">
        <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-bold">Notes:</span> {profile.notes || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Terms:</span> {profile.terms || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Main Crop:</span>{' '}
            {profile.mainCrop || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Land Size:</span>{' '}
            {profile.landSize || 'N/A'} ha
          </p>
        </div>
      </div>

      <div className="mb-6  border-b border-slate-50 py-4 pb-8">
        <h3 className="text-xl font-semibold mb-4">Products</h3>
        <div className="flex flex-wrap gap-2">
          {profile.products.length > 0 ? (
            profile.products.map((product, index) => (
              <div
                key={index}
                className="bg-slate-600 dark:bg-lime-600 text-white px-4 py-2 rounded-lg shadow-sm"
              >
                {product}
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>

      <div className="text-sm text-slate-400">
        <p>
          <span className="font-bold">Joining Date:</span>{' '}
          {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
