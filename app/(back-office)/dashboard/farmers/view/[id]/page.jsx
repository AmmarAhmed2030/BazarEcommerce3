import { getData } from '@/lib/getData';
import Image from 'next/image';

export default async function FarmerProfile({ params: { id } }) {
  const profile = await getData(`farmers/farmer/${id}`);
  return (
    <div className="px-4 mx-auto max-w-[325px] xs:max-w-[480px] sm:max-w-[650px] md:max-w-[1000px]  lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-3xl 4xl:max-w-4xl 5xl:max-w-5xl 6xl:max-w-6xl  overflow-auto">
      <div className="bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-50 px-4 rounded-lg">
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
            <h2 className="text-xl font-bold px-4 text-wrap">{profile.name}</h2>
            <p className="text-slate-400 px-4 text-sm sm:text-base md:text-lg lg:text-xl  break-words text-wrap w-[150px] xs:w-[300px]">
              {profile.email}
            </p>

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

        <div className="text-sm text-slate-400 py-4">
          <p>
            <span className="font-bold">Joining Date:</span>{' '}
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
