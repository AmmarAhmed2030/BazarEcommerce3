import { convertIsoDateToNormal } from '@/lib/convertIsoDateToNormal';
import { getData } from '@/lib/getData';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function UserProfile({ params: { id } }) {
  const userId = id;
  const profile = await getData(`users/profile/${userId}`);
  console.log(profile);
  if (!profile) {
    return (
      <div className="flex items-center justify-center gap-4 py-8 text-2xl">
        <span className="text-slate-50">No Profile Yet : </span>
        <Link
          href={`/users/update/${userId}`}
          className="text-lime-600 flex items-center justify-center gap-2 hover:text-lime-800"
        >
          <span>Create Your Profile</span> <ArrowRight />
        </Link>
      </div>
    );
  }
  return (
    <div
      className="dark:bg-slate-700 dark:text-white bg-white text-slate-800
      p-6 rounded-lg shadow-md max-w-3xl mx-auto"
    >
      <div className="flex items-center mb-6 border-b border-slate-50 py-4 pb-8">
        {profile?.profileImage ? (
          <Image
            src={profile?.profileImage}
            alt={`${profile?.name}'s profile picture`}
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
          <p className="text-slate-400 px-4">{profile.email}</p>
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
            <span className="font-bold">Fist Name:</span>{' '}
            {profile.firstName || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Last Name:</span>{' '}
            {profile.lastName || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {profile.phone || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Username:</span>{' '}
            {profile.username || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Street:</span>{' '}
            {profile.streetAddress || 'N/A'}
          </p>
          <p>
            <span className="font-bold">City:</span> {profile.city || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Country:</span>{' '}
            {profile.country || 'N/A'}
          </p>
          <p>
            <span className="font-bold">District:</span>{' '}
            {profile.district || 'N/A'}
          </p>
        </div>
      </div>
      <div className="mb-6  border-b border-slate-50 py-4 pb-8">
        <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-bold">Date Of Birth:</span>{' '}
            {convertIsoDateToNormal(profile.dateOfBirth) || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
